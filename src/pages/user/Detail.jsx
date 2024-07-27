import { useEffect, useState } from "react";
import { Layout, PropertyCard } from "../../components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useParams } from "react-router-dom";
import { usePropertyStore } from "../../hooks";

const Detail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [viewImg, setViewImg] = useState(false);
  const data = usePropertyStore((s) => s.property);

  useEffect(() => {
    const fetch = data.filter((d) => d.id == id)[0];
    setProperty(fetch);
  }, [id]);

  if (viewImg) {
    return (
      <div>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
          onClick={() => setViewImg(false)}
        >
          ✕
        </button>
        <Carousel
          infinite={true}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1,
              slidesToSlide: 1,
            },
          }}
        >
          {property?.img?.map((d, i) => {
            return (
              <div key={i} className="h-screen grid place-content-center">
                <img src={d?.src} className="mx-auto" />
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto pb-12">
        <div className="grid gap-8 grid-flow-row-dense grid-row-4 grid-cols-3 mb-8 pt-8">
          <div className="col-span-2">
            <div className="text-xl text-[#FF5A3C] font-bold">
              {property?.price} - {property?.size} square feet
            </div>
            <div className="flex justify-between">
              <div className="capitalize">
                {property?.name}, {property?.address?.city}
              </div>
              <div>
                <button className="btn btn-ghost btn-xs">
                  <FavoriteBorderOutlinedIcon />
                  Shortlist
                </button>
                <button className="btn btn-ghost btn-xs">
                  <ReplyOutlinedIcon />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-2 relative">
            <div className="carousel space-x-1 rounded-lg">
              {property?.img?.map((d, i) => {
                return (
                  <div key={i} className="carousel-item">
                    <img src={d?.src} className="w-full" />
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-sm absolute bottom-6 left-6 rounded-full"
              onClick={() => setViewImg(true)}
            >
              View all {property?.img?.length} pictures
            </button>
          </div>

          <div className="p-6 shadow-md rounded-lg col-span-2 bg-base-100">
            <div className="font-semibold mb-4">PROPERTY DESCRIPTION</div>
            <p>
              Former high end beach home converted to Class “A” office space.
              2519 sq ft complete with three and 1/2 baths. Large eat in
              kitchen/conference area. Many storage areas and closets. Currently
              used as 10 offices with large reception area. Fully wired with Cat
              5 wiring to all, phone room. Exterior storage and parking spaces
              for 12 cars.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-lg col-span-2 bg-base-100">
            <div className="font-semibold mb-4">PROPERTY ADDRESS</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="font-medium">Address</span> :{" "}
                {property?.address?.address}
              </div>
              <div>
                <span className="font-medium">City</span> :{" "}
                {property?.address?.city}
              </div>
              <div>
                <span className="font-medium">Area</span> :{" "}
                {property?.address?.country}
              </div>
              <div>
                <span className="font-medium">State/Country</span> :{" "}
                {property?.address?.state}
              </div>
              <div>
                <span className="font-medium">Zip</span> :{" "}
                {property?.address?.zip}
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="font-semibold mb-4">MAP</div>
            <div className="w-full h-[calc(100vh_-_10rem)] mb-4">
              <iframe
                src={`https://www.google.com/maps/embed?pb=${
                  !property?.map?.embedId
                    ? "!1m14!1m12!1m3!1d479.70156016309465!2d103.09487959339563!3d5.404162382706566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smy!4v1722045100109!5m2!1sen!2smy"
                    : property?.map?.embedId
                }`}
                width="100%"
                height="100%"
                allowfullscreen="true"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div>
              <div className="font-semibold">DIRECTIONS</div>
              <p>{property?.map?.direction}</p>
            </div>
          </div>

          <div className="col-span-2">
            <div className="font-semibold mb-4">PROPERTY VIDEO</div>
            <div className="relative pb-[56%]">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/cEHMIPT9vcs?si=C9n77vQOIWwkQyb2"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                className="w-full h-full absolute"
              ></iframe>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md rounded-lg row-start-2 col-start-3 row-span-4 h-min">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={property?.avatar} />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-medium">
                    {property?.agent?.name}
                  </div>
                  <div className="text-gray-400">
                    Phone : {property?.agent?.phone}
                  </div>
                </div>
              </div>
              <form className="grid gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Message"
                ></textarea>
                <button type="button" className="btn bg-[#FF5A3C] text-white">
                  Contact Staff
                </button>
              </form>
              <div className="card-actions justify-end">
                <div className="text-xs">
                  By clicking the button, you agree to our{" "}
                  <a href="" className="link-primary">
                    Terms Use
                  </a>{" "}
                  and{" "}
                  <a href="" className="link-primary">
                    Privacy Policy.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-4">Similar to {property?.name}</div>
          <div className="grid grid-cols-4 gap-6">
            {data?.slice(0, 4).map((d, i) => {
              return <PropertyCard key={i} property={d} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
