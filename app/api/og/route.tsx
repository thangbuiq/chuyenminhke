import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "chuyện mình kể";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const cover = searchParams.get("cover") || `${baseUrl}/icon.png`;
    const layout = searchParams.get("layout") || "left"; // 'left' or 'right'

    const playfairRegular = fetch(
      new URL("/static/PlayfairDisplay-Regular.ttf", request.url),
    ).then((res) => res.arrayBuffer());

    const playfairSemiBold = fetch(
      new URL("/static/PlayfairDisplay-SemiBold.ttf", request.url),
    ).then((res) => res.arrayBuffer());

    const [regularFont, semiBoldFont] = await Promise.all([
      playfairRegular,
      playfairSemiBold,
    ]);

    const cleanTitle = title.replace(/[^\p{L}\p{N}\s.,!?-]/gu, "");
    const displayTitle =
      cleanTitle.length > 60 ? cleanTitle.substring(0, 57) + "..." : cleanTitle;

    const isLeftLayout = layout === "left";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: isLeftLayout ? "row" : "row-reverse",
            background: "white",
            fontFamily: "Playfair Display",
            position: "relative",
            padding: "80px 60px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          />

          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Brand */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                opacity: 0.7,
              }}
            >
              {/* 3 dots horizontal */}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "black",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "black",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "black",
                }}
              />
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "black",
                  fontFamily: "Playfair Display",
                }}
              >
                chuyện mình kể
              </span>
            </div>

            {/* Main title */}
            <h1
              style={{
                fontSize: displayTitle.length > 40 ? "36px" : "42px",
                fontWeight: 600,
                color: "#1c1917",
                textAlign: "center",
                lineHeight: "1.2",
                maxWidth: "100%",
                margin: 0,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                fontFamily: "Playfair Display",
              }}
            >
              &ldquo;{displayTitle}&rdquo;
            </h1>
          </div>

          <div
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "85%",
                height: "70%",
                position: "relative",
                borderRadius: "1em",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={cover}
                alt="Cover"
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Playfair Display",
            data: semiBoldFont,
            style: "normal",
            weight: 600,
          },
          {
            name: "Playfair Display",
            data: regularFont,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
