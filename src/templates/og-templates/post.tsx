import type Post from "../../interfaces/Post";

export default (post: Post) => {
    const title = post.title ?? "文章";
    const author = post.author?.name ?? "Seamain";
    const category = post.category?.name ?? "";

    return (
        <div
            style={{
                display: "flex",
                width: "1200px",
                height: "630px",
                fontFamily: "'Noto Sans SC', 'IBM Plex Mono', sans-serif",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #0f172a 0%, #1e1033 50%, #0f172a 100%)",
            }}
        >
            {/* Background glow top-left (pink) */}
            <div style={{
                position: "absolute", top: "-80px", left: "-80px",
                width: "400px", height: "400px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)",
                display: "flex",
            }} />
            {/* Background glow bottom-right (purple) */}
            <div style={{
                position: "absolute", bottom: "-100px", right: "-60px",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
                display: "flex",
            }} />

            {/* Subtle grid overlay */}
            <div style={{
                position: "absolute", inset: "0",
                backgroundImage: "linear-gradient(rgba(255,107,157,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,157,0.04) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                display: "flex",
            }} />

            {/* Left accent bar */}
            <div style={{
                position: "absolute", left: "0", top: "0", bottom: "0", width: "5px",
                background: "linear-gradient(to bottom, #FF6B9D, #8B5CF6, #00F5FF)",
                display: "flex",
            }} />

            {/* Main content */}
            <div style={{
                display: "flex", flexDirection: "column",
                justifyContent: "space-between",
                padding: "56px 72px 56px 80px",
                width: "100%", position: "relative",
            }}>
                {/* Top row: site name + category */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: "#FF6B9D",
                        display: "flex",
                    }} />
                    <span style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "14px", fontWeight: 400,
                        color: "rgba(255,107,157,0.7)",
                        letterSpacing: "0.3em",
                    }}>
                        SEAMAIN.ORG
                    </span>
                    {category ? (
                        <span style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "12px", color: "rgba(139,92,246,0.7)",
                            letterSpacing: "0.2em", marginLeft: "8px",
                        }}>
                            / {category}
                        </span>
                    ) : null}
                </div>

                {/* Center: decorative line + title + tags */}
                <div style={{
                    display: "flex", flexDirection: "column", gap: "20px",
                    flex: 1, justifyContent: "center", padding: "20px 0",
                }}>
                    <div style={{
                        width: "48px", height: "3px",
                        background: "linear-gradient(to right, #FF6B9D, transparent)",
                        display: "flex",
                    }} />
                    <div style={{
                        fontSize: title.length > 22 ? "44px" : "54px",
                        fontWeight: 700, color: "#f1f5f9", lineHeight: 1.35,
                        fontFamily: "'Noto Sans SC', sans-serif",
                        display: "flex", flexWrap: "wrap",
                    }}>
                        {title}
                    </div>
                    {post.tags && post.tags.length > 0 ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            {post.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} style={{
                                    fontSize: "13px", color: "rgba(255,107,157,0.85)",
                                    border: "1px solid rgba(255,107,157,0.35)",
                                    borderRadius: "9999px", padding: "4px 16px",
                                    background: "rgba(255,107,157,0.08)", display: "flex",
                                }}>
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Bottom row: author + branding */}
                <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                            width: "38px", height: "38px", borderRadius: "50%",
                            background: "linear-gradient(135deg, #FF6B9D, #8B5CF6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "18px", fontWeight: 700, color: "white",
                        }}>
                            {author.slice(0, 1)}
                        </div>
                        <span style={{
                            fontSize: "17px", color: "#94a3b8",
                            fontFamily: "'Noto Sans SC', sans-serif",
                        }}>
                            {author}
                        </span>
                    </div>
                    <span style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "13px", color: "rgba(148,163,184,0.45)",
                        letterSpacing: "0.05em",
                    }}>
                        Seamain's Blog
                    </span>
                </div>
            </div>
        </div>
    );
};
