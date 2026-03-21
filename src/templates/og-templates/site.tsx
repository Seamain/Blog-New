export default () => {
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
            {/* Pink glow top-left */}
            <div style={{
                position: "absolute", top: "-100px", left: "-100px",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)",
                display: "flex",
            }} />
            {/* Purple glow bottom-right */}
            <div style={{
                position: "absolute", bottom: "-120px", right: "-80px",
                width: "550px", height: "550px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
                display: "flex",
            }} />
            {/* Cyan glow center */}
            <div style={{
                position: "absolute", top: "150px", left: "400px",
                width: "300px", height: "300px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)",
                display: "flex",
            }} />

            {/* Grid overlay */}
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
                justifyContent: "center", alignItems: "flex-start",
                padding: "0 80px",
                width: "100%", position: "relative",
            }}>
                {/* Domain */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
                    <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: "#FF6B9D",
                        display: "flex",
                    }} />
                    <span style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "14px", color: "rgba(255,107,157,0.7)",
                        letterSpacing: "0.35em",
                    }}>
                        SEAMAIN.ORG
                    </span>
                </div>

                {/* Decorative line */}
                <div style={{
                    width: "64px", height: "3px",
                    background: "linear-gradient(to right, #FF6B9D, #8B5CF6)",
                    marginBottom: "24px", display: "flex",
                }} />

                {/* Main title */}
                <div style={{
                    fontSize: "68px", fontWeight: 700,
                    color: "#f1f5f9", lineHeight: 1.2,
                    fontFamily: "'Noto Sans SC', sans-serif",
                    display: "flex", flexWrap: "wrap",
                }}>
                    S09指挥官Seamain的个人纪录
                </div>

                {/* Subtitle */}
                <div style={{
                    marginTop: "20px",
                    fontSize: "20px", color: "#64748b",
                    fontFamily: "'Noto Sans SC', sans-serif",
                    display: "flex",
                }}>
                    记录技术、产品与生活的灵感
                </div>

                {/* Tag badges */}
                <div style={{
                    display: "flex", gap: "12px", marginTop: "36px",
                }}>
                    {["Tech", "Product", "Life"].map((label, i) => {
                        const colors = [
                            { color: "rgba(255,107,157,0.85)", border: "rgba(255,107,157,0.35)", bg: "rgba(255,107,157,0.08)" },
                            { color: "rgba(139,92,246,0.85)", border: "rgba(139,92,246,0.35)", bg: "rgba(139,92,246,0.08)" },
                            { color: "rgba(0,245,255,0.8)", border: "rgba(0,245,255,0.3)", bg: "rgba(0,245,255,0.06)" },
                        ];
                        const c = colors[i];
                        return (
                            <span key={i} style={{
                                fontSize: "14px", color: c.color,
                                border: `1px solid ${c.border}`,
                                borderRadius: "9999px", padding: "6px 20px",
                                background: c.bg,
                                fontFamily: "'IBM Plex Mono', monospace",
                                letterSpacing: "0.15em",
                                display: "flex",
                            }}>
                                * {label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
