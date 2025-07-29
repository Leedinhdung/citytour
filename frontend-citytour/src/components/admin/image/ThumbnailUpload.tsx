import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";

const ThumbnailUpload = ({ thumbnails, onUpload, onRemove, inputRef }: any) => (
    <div>
        <Label>Ảnh banner</Label>
        <div className="space-y-2">
            <div className="flex gap-3 flex-wrap">
                {thumbnails.map((url: string, idx: number) => (
                    <div key={idx} className="relative w-[180px] h-[120px] overflow-hidden rounded-md border">
                        <img src={url} className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => onRemove(url)}
                            className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:bg-black/90"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <Input ref={inputRef} type="file" accept="image/*" multiple onChange={onUpload} className="hidden" />
                <Button type="button" onClick={() => inputRef.current?.click()} variant="outline">
                    <ImagePlus className="h-4 w-4 mr-1" /> Chọn ảnh thumbnail
                </Button>
            </div>
        </div>
    </div>
);
export default ThumbnailUpload