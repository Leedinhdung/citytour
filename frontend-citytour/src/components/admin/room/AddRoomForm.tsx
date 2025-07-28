import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { X, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { generateSlug } from "@/utils/generateSlug";
import { useGetAllCruises } from "@/hooks/admin/cruise/useCruise";
import UploadCloudinary from "@/utils/cloundinary";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddRoom } from "@/hooks/admin/room/useRoom";
import { IRoom } from "@/types/room";
import routes from "@/routes/routes";
import { useNavigate } from "react-router-dom";

const cruiseFeatures = [
    "Nhìn ra biển",
    "Ban công riêng",
    "Bồn tắm riêng",
    "Wifi miễn phí",
    "Sạc điện thoại",
    "Điều hòa",
    "Tủ lạnh",
    "Két an toàn",
    "Smart TV"
];

const AddRoomForm = () => {
    const navigate = useNavigate()
    const { mutateAsync: addRoom } = useAddRoom()
    const { data: cruisesData, isLoading } = useGetAllCruises()
    const {
        register,
        watch,
        control,
        handleSubmit,
        setValue,
    } = useForm<IRoom>({});

    const [imagePreview, setImagePreview] = useState("");
    const [thumbnailPreviews, setThumbnailPreviews] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = await UploadCloudinary(file);
            console.log("Cloudinary URL:", imageUrl);
            setImagePreview(imageUrl);
            setValue("image", imageUrl);
        }
    };
    const handleRemoveImage = () => {
        setImagePreview("");
        setValue("image", "");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const urls: string[] = [];
            for (const file of Array.from(files)) {
                const url = await UploadCloudinary(file);
                urls.push(url);
            }
            const updated = [...(watch("thumbnail") || []), ...urls];
            setThumbnailPreviews(updated);
            setValue("thumbnail", updated);
        }
    };

    const handleRemoveThumbnail = (url: string) => {
        const updated = thumbnailPreviews.filter((img) => img !== url);
        setThumbnailPreviews(updated);
        setValue("thumbnail", updated);
    };

    const handleFeatureChange = (feature: string, checked: boolean) => {
        const updated = checked
            ? [...selectedFeatures, feature]
            : selectedFeatures.filter((f) => f !== feature);
        setSelectedFeatures(updated);
        setValue("features", updated);
    };

    const onSubmit = async (data: IRoom) => {
        data.slug = generateSlug(data.name || "");
        try {
            await addRoom(data);
            navigate(routes.roomList)
        } catch (error) {
            console.error("Error adding room:", error);
        }
    };
    if (isLoading) return <div>...Loading</div>;
    return (
        <div className="mx-12 md:ml-56">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl font-semibold">Thêm phòng mới</CardTitle>
                        <CardDescription>Điền thông tin cho phòng mới</CardDescription>
                    </div>
                    <Button type="submit">Thêm phòng</Button>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6">
                                <Label>Tên phòng</Label>
                                <Input
                                    {...register("name")}
                                    placeholder="Phòng Deluxe"
                                />
                            </div>
                            <div className="col-span-3">
                                <Label>Du thuyền</Label>
                                <Controller
                                    name="cruise_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm">
                                                <SelectValue placeholder="Chọn du thuyền" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cruisesData?.map((cruise) => (
                                                    <SelectItem key={cruise._id} value={cruise._id}>
                                                        {cruise.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                            </div>
                            <div className="col-span-3">
                                <Label>Slug URL</Label>
                                <Input
                                    id="slug"
                                    value={generateSlug(watch("name") || "")}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-3">
                                <Label>Giá cơ bản</Label>
                                <Input type="number" {...register("price")} placeholder="10000000" />
                            </div>
                            <div className="col-span-3">
                                <Label>Diện tích</Label>
                                <Input {...register("area")} placeholder="Diện tích" />
                            </div>
                            <div className="col-span-3">
                                <Label>Số khách tối đa</Label>
                                <Input {...register("max_guests")} placeholder="3" />
                            </div>
                            <div className="col-span-3">
                                <Label>Trạng thái</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm">
                                                <SelectValue placeholder="Trạng thái" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="available">Còn trống</SelectItem>
                                                <SelectItem value="booked">Đã đặt</SelectItem>
                                                <SelectItem value="maintenance">Bảo trì</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
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
                                        {thumbnailPreviews.map((url, idx) => (
                                            <div key={idx} className="relative w-[180px] h-[120px] overflow-hidden rounded-md border">
                                                <img src={url} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveThumbnail(url)}
                                                    className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:bg-black/90"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            ref={thumbnailInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleThumbnailChange}
                                            className="hidden"
                                        />
                                        <Button type="button" onClick={() => thumbnailInputRef.current?.click()} variant="outline">
                                            <ImagePlus className="h-4 w-4 mr-1" /> Chọn ảnh thumbnail
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

export default AddRoomForm;
