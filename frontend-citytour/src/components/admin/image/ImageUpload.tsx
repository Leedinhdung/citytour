import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";

const ImageUpload = ({ label, imageUrl, onUpload, onRemove, inputRef }: any) => (
    <div>
        <Label>{label}</Label>
        <div className="space-y-2">
            {imageUrl && (
                <div className="relative h-[200px] w-full max-w-[400px] overflow-hidden border rounded-md">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:bg-black/90"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}
            <div className="flex gap-2 items-center">
                <Input ref={inputRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
                <Button type="button" onClick={() => inputRef.current?.click()} variant="outline">
                    <ImagePlus className="h-4 w-4 mr-1" /> Chọn hình ảnh
                </Button>
                <span className="text-sm text-muted-foreground">JPG, PNG hoặc GIF tối đa 5MB</span>
            </div>
        </div>
    </div>
);
export default ImageUpload
