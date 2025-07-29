import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
import ImageUpload from "@/components/admin/image/ImageUpload";
import ThumbnailUpload from "@/components/admin/image/ThumbnailUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomSchema } from "@/validations/roomSchema";

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
        formState: { errors }
    } = useForm<IRoom>({
        resolver: zodResolver(roomSchema)
    });

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
                                <span className="text-sm text-red-400">
                                    {errors.name?.message}
                                </span>
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
                                <span className="text-sm text-red-400">
                                    {errors.cruise_id?.message}
                                </span>
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
                                <span className="text-sm text-red-400">
                                    {errors.price?.message}
                                </span>
                            </div>
                            <div className="col-span-3">
                                <Label>Diện tích</Label>
                                <Input {...register("area")} placeholder="Diện tích" />
                                <span className="text-sm text-red-400">
                                    {errors.area?.message}
                                </span>
                            </div>
                            <div className="col-span-3">
                                <Label>Số khách tối đa</Label>
                                <Input {...register("max_guests")} placeholder="3" />
                                <span className="text-sm text-red-400">
                                    {errors.max_guests?.message}
                                </span>
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
                                <span className="text-sm text-red-400">
                                    {errors.status?.message}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {/* Ảnh đại diện */}
                            <ImageUpload
                                label="Ảnh đại diện"
                                imageUrl={imagePreview}
                                onUpload={handleImageChange}
                                onRemove={handleRemoveImage}
                                inputRef={fileInputRef}
                            />

                            {/* Thumbnail */}
                            <ThumbnailUpload
                                thumbnails={thumbnailPreviews}
                                onUpload={handleThumbnailChange}
                                onRemove={handleRemoveThumbnail}
                                inputRef={thumbnailInputRef}
                            />
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
