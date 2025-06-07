export default function ActorCarousel({ cast = [] }) {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Obsada</h3>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {cast.slice(0, 15).map((a) => (
                    <div key={a.id} className="shrink-0 w-24 text-center">
                        <img
                            src={
                                a.profile_path
                                    ? `https://image.tmdb.org/t/p/w185${a.profile_path}`
                                    : "/no-face.png"
                            }
                            alt={a.name}
                            className="rounded-lg w-full h-32 object-cover"
                        />
                        <p className="mt-1 text-xs font-medium line-clamp-2">{a.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}