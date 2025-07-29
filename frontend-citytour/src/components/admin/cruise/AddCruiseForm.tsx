import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { X, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { api_key_tiny, tinyMCE } from "@/configs/tinyMCE";
import { generateSlug } from "@/utils/generateSlug";
import { ICruise } from "@/types/cruise";
import { useAddCruise } from "@/hooks/admin/cruise/useCruise";
import UploadCloudinary from "@/utils/cloundinary";
import routes from "@/routes/routes";
import { useNavigate } from "react-router-dom";

const cruiseFeatures = [
    "Nhà hàng",
    "Quầy bar",
    "Spa & massage",
    "Bể bơi / Jacuzzi",
    "Phòng gym",
    "Sân thượng tắm nắng",
    "Phòng nghỉ có ban công",
    "Bồn tắm riêng",
    "Câu mực đêm",
    "Biểu diễn âm nhạc",
    "Wifi miễn phí",
    "Dịch vụ xe đưa đón",
    "Hướng dẫn viên du lịch",
    "Dịch vụ lễ kỷ niệm / sinh nhật",
];

const AddCruiseForm = () => {
    const navigate = useNavigate()
    const { mutateAsync: addCruise } = useAddCruise();
    const {
        register,
        watch,
        handleSubmit,
        setValue,
    } = useForm<ICruise>({});

    const [imagePreview, setImagePreview] = useState("");
    const [bannerPreviews, setBannerPreviews] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const introductionEditorRef = useRef<unknown>(null);
    const descriptionEditorRef = useRef<unknown>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = await UploadCloudinary(file);
            setImagePreview(imageUrl);
            setValue("thumbnail", imageUrl);
        }
    };
    const handleRemoveImage = () => {
        setImagePreview("");
        setValue("thumbnail", "");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const urls: string[] = [];
            for (const file of Array.from(files)) {
                const url = await UploadCloudinary(file);
                urls.push(url);
            }
            const updated = [...(watch("gallery") || []), ...urls];
            setBannerPreviews(updated);
            setValue("gallery", updated);
        }
    };

    const handleRemoveBanner = (url: string) => {
        const updated = bannerPreviews.filter((img) => img !== url);
        setBannerPreviews(updated);
        setValue("gallery", updated);
    };

    const handleFeatureChange = (feature: string, checked: boolean) => {
        const updated = checked
            ? [...selectedFeatures, feature]
            : selectedFeatures.filter((f) => f !== feature);
        setSelectedFeatures(updated);
        setValue("features", updated);
    };

    const onSubmit = async (data: ICruise) => {
        data.slug = generateSlug(data.name || "");
        try {
            await addCruise(data);
            navigate(routes.cruiseList)
        } catch (error) {
            console.error("Error adding cruise:", error);
        }
    };

    return (
        <div className="mx-12 md:ml-56">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl font-semibold">Thêm du thuyền mới</CardTitle>
                        <CardDescription>Điền thông tin cho du thuyền mới</CardDescription>
                    </div>
                    <Button type="submit">Thêm du thuyền</Button>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6">
                                <Label>Tên du thuyền</Label>
                                <Input
                                    {...register("name")}
                                    placeholder="Heritage Bình Chuẩn"
                                />
                            </div>
                            <div className="col-span-3">
                                <Label>Vị trí</Label>
                                <Input {...register("location")} placeholder="Cát Bà, Hải Phòng" />
                            </div>
                            <div className="col-span-3">
                                <Label>Số sao</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={5}
                                    {...register("stars")}
                                    placeholder="5"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-3">
                                <Label>Slug URL</Label>
                                <Input
                                    id="slug"
                                    value={generateSlug(watch("name") || "")}
                                    readOnly
                                />
                            </div>
                            <div className="col-span-3">
                                <Label>Hãng vận hành</Label>
                                <Input {...register("operator")} placeholder="Heritage Cruises" />
                            </div>
                            <div className="col-span-3">
                                <Label>Giá cơ bản</Label>
                                <Input type="number" {...register("base_price")} placeholder="10000000" />
                            </div>
                            <div className="col-span-3">
                                <Label>Hành trình</Label>
                                <Input {...register("trip")} placeholder="Hành trình" />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-3">
                                <Label>Năm hạ thủy</Label>
                                <Input {...register("launch_year")} placeholder="2019" />
                            </div>
                            <div className="col-span-3">
                                <Label>Số lượng cabin</Label>
                                <Input type="number" {...register("cabin_count")} placeholder="30" />
                            </div>
                            <div className="col-span-3">
                                <Label>Ngày bắt đầu</Label>
                                <Input
                                    type="date"
                                    {...register("startDate")}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder="Chọn ngày"
                                />
                            </div>
                            <div className="col-span-3">
                                <Label>Ngày kết thúc</Label>
                                <Input
                                    type="date"
                                    {...register("endDate")}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder="Chọn ngày"
                                />
                            </div>
                        </div>

                        {/* Editors */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <Label className="mb-2">Giới thiệu</Label>
                                <Editor
                                    apiKey={api_key_tiny}
                                    onInit={(_, editor) => (introductionEditorRef.current = editor)}
                                    initialValue={watch("introduction")}
                                    init={{
                                        ...tinyMCE,
                                        directionality: "ltr",
                                    }}
                                    onEditorChange={(content) => setValue("introduction", content)}
                                />
                            </div>
                            <div>
                                <Label className="mb-2">Mô tả</Label>
                                <Editor
                                    apiKey={api_key_tiny}
                                    onInit={(_, editor) => (descriptionEditorRef.current = editor)}
                                    initialValue={watch("description")}
                                    init={{
                                        ...tinyMCE,
                                        directionality: "ltr",
                                    }}
                                    onEditorChange={(content) => setValue("description", content)}
                                />
                            </div>
                        </div>

                        {/* Images */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <Label>Ảnh đại diện</Label>
                                <div className="space-y-2">
                                    {imagePreview && (
                                        <div className="relative h-[200px] w-full max-w-[400px] overflow-hidden border rounded-md">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:bg-black/90"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">
                                            <ImagePlus className="h-4 w-4 mr-1" /> Chọn hình ảnh
                                        </Button>
                                        <span className="text-sm text-muted-foreground">JPG, PNG hoặc GIF tối đa 5MB</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label>Ảnh banner</Label>
                                <div className="space-y-2">
                                    <div className="flex gap-3 flex-wrap">
                                        {bannerPreviews.map((url, idx) => (
                                            <div key={idx} className="relative w-[180px] h-[120px] overflow-hidden rounded-md border">
                                                <img src={url} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveBanner(url)}
                                                    className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:bg-black/90"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            ref={bannerInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleBannerChange}
                                            className="hidden"
                                        />
                                        <Button type="button" onClick={() => bannerInputRef.current?.click()} variant="outline">
                                            <ImagePlus className="h-4 w-4 mr-1" /> Chọn ảnh banner
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features & Schedule */}
                        <div>
                            <Label>Tiện ích nổi bật</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {cruiseFeatures.map((feature) => (
                                    <div key={feature} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`feature-${feature}`}
                                            checked={selectedFeatures.includes(feature)}
                                            onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                                        />
                                        <Label htmlFor={`feature-${feature}`} className="text-sm font-normal">
                                            {feature}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </form>
        </div>
    );
};

export default AddCruiseForm;
