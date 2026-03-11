import React from "react";
import "./VideoGallery.css"; // Import CSS file for styling

const videos = [
  {
    id: 1,
    thumbnail: "https://www.sunnystateagency.com/images/Matty.jpg",
    // videoUrl: v1,
    caption: "DO I LOOK LIKE",
    width: "450px",
    height: "400px",
  },
  {
    id: 2,
    thumbnail: "https://www.sunnystateagency.com/images/nigel.jpg",
    // videoUrl: v2,
    caption: "THIS ONE IS",
    width: "400px",
    height: "350px",
  },
  {
    id: 3,
    thumbnail: "https://www.sunnystateagency.com/images/steve-o.jpg",
    // videoUrl: v3,
    caption: "",
    width: "600px",
    height: "500px",
  },
  {
    id: 4,
    thumbnail: "https://www.sunnystateagency.com/images/nikki.jpg",
    // videoUrl: v1,
    caption: "HE'S MOST KNOWN FOR",
    width: "400px",
    height: "350px",
  },
  {
    id: 5,
    thumbnail: "https://www.sunnystateagency.com/images/andrew.jpg",
    // videoUrl:
    //   v2,
    caption: "",
    width: "450px",
    height: "400px",
  },
];

const VideosStack = () => {
  return (
    <>
      <div className="video-gallery py-10 px-8">
        {videos.map((video) => (
          <div
            className="video-card"
            key={video.id}
            style={{ width: video.width, height: video.height }}
          >
            <div className="video-thumbnail">
              <video
                // src={video.videoUrl}
                poster={video.thumbnail} // Thumbnail image before video plays
                muted
                loop
                className="video-element"
                // onMouseEnter={(e) => e.target.play()} // Play on hover
                // onMouseLeave={(e) => {
                //   e.target.pause(); // Pause video when hover ends
                //   e.target.currentTime = 0; // Reset video to the start
                // }}
              ></video>

            </div>
            {video.caption && <div className="caption">{video.caption}</div>}
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosStack;
