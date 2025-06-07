export default function Trailer({ videos = [] }) {
    const yt = videos.find((v) => v.type === "Trailer" && v.site === "YouTube");
    if (!yt) return null;

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Zwiastun</h3>
            <div className="aspect-video w-full">
                <iframe
                    src={`https://www.youtube.com/embed/${yt.key}`}
                    title="Trailer"
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                />
            </div>
        </div>
    );
}