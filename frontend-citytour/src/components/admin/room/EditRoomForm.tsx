import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { generateSlug } from "@/utils/generateSlug";
import UploadCloudinary from "@/utils/cloundinary";
import { useGetAllCruises } from "@/hooks/admin/cruise/useCruise";
import { useGetRoomBySlug, useUpdateRoom } from "@/hooks/admin/room/useRoom";
import { useGetSlugParams } from "@/hooks/common/useGetSlugParams";

import { IRoom } from "@/types/room";
import routes from "@/routes/routes";
import ThumbnailUpload from "@/components/admin/image/ThumbnailUpload";
import ImageUpload from "@/components/admin/image/ImageUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomSchema } from "@/validations/roomSchema";

const cruiseFeatures = [
    "Nhìn ra biển", "Ban công riêng", "Bồn tắm riêng", "Wifi miễn phí",
    "Sạc điện thoại", "Điều hòa", "Tủ lạnh", "Két an toàn", "Smart TV"
];

const EditRoomForm = () => {
    const slug = useGetSlugParams("slug");
    const navigate = useNavigate();
    const { mutateAsync: updateRoom } = useUpdateRoom();
    const { data: cruisesData, isLoading } = useGetAllCruises();
    const { data: roomData } = useGetRoomBySlug(slug!);

    const {
        register, watch, control, handleSubmit, reset, setValue, formState: { errors }
    } = useForm<IRoom>({
        resolver: zodResolver(roomSchema)
    });

    const [imagePreview, setImagePreview] = useState("");
    const [thumbnailPreviews, setThumbnailPreviews] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (roomData) {
            reset(roomData);
            setImagePreview(roomData.image || "");
            setThumbnailPreviews(roomData.thumbnail || []);
            setSelectedFeatures(roomData.features || []);
        }
    }, [roomData, reset]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = await UploadCloudinary(file);
        setImagePreview(url);
        setValue("image", url);
    };

    const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !files.length) return;

        const urls = await Promise.all(Array.from(files).map(UploadCloudinary));
        const updated = [...(watch("thumbnail") || []), ...urls];
        setThumbnailPreviews(updated);
        setValue("thumbnail", updated);
    };

    const handleRemoveImage = () => {
        setImagePreview("");
        setValue("image", "");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleRemoveThumbnail = (url: string) => {
        const updated = thumbnailPreviews.filter(img => img !== url);
        setThumbnailPreviews(updated);
        setValue("thumbnail", updated);
    };

    const handleFeatureToggle = (feature: string, checked: boolean) => {
        const updated = checked
            ? [...selectedFeatures, feature]
            : selectedFeatures.filter(f => f !== feature);
        setSelectedFeatures(updated);
        setValue("features", updated);
    };

    const onSubmit = async (data: IRoom) => {
        data.slug = generateSlug(data.name || "");
        try {
            await updateRoom([slug!, data]);
            navigate(routes.roomList);
        } catch (error) {
            console.error("Error updating room:", error);
        }
    };

    if (isLoading) return <div>Đang tải...</div>;

    return (
        <div className="mx-12 md:ml-56">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl font-semibold">Chỉnh sửa phòng</CardTitle>
                        <CardDescription>Điền thông tin cần chỉnh sửa</CardDescription>
                    </div>
                    <Button type="submit">Cập nhật phòng</Button>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6">
                        {/* Phần thông tin cơ bản */}
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6">
                                <Label>Tên phòng</Label>
                                <Input {...register("name")} placeholder="Phòng Deluxe" />
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
                                                {cruisesData?.map(cruise => (
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
                                <Input value={generateSlug(watch("name") || "")} readOnly />
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
                                onUpload={handleImageUpload}
                                onRemove={handleRemoveImage}
                                inputRef={fileInputRef}
                            />

                            {/* Thumbnail */}
                            <ThumbnailUpload
                                thumbnails={thumbnailPreviews}
                                onUpload={handleThumbnailUpload}
                                onRemove={handleRemoveThumbnail}
                                inputRef={thumbnailInputRef}
                            />
                        </div>
                        {/* Tiện ích */}
                        <div>
                            <Label>Tiện ích nổi bật</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {cruiseFeatures.map(feature => (
                                    <div key={feature} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={feature}
                                            checked={selectedFeatures.includes(feature)}
                                            onCheckedChange={(checked) => handleFeatureToggle(feature, checked as boolean)}
                                        />
                                        <Label htmlFor={feature} className="text-sm font-normal">{feature}</Label>
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

export default EditRoomForm;