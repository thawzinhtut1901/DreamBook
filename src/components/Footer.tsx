import { FooterImg, GooglePLay, AppStore } from "@/assets";

const Footer = () => {
  return (
    <div className="px-0 mx-0 ">
      <div className="flex flex-col w-full p-12 mt-10 bg-blue-600 bg-opacity-75 md:items-center md:px-20">
        <img
          src={FooterImg}
          alt=""
          className=" md:w-[290px] w-[240px] md:h-[65px]"
        />
        <div className="flex flex-col w-full md:gap-3 md:flex-row md:items-center">
          <div className="flex md:flex-row gap-3 md:justify-center md:w-full flex-col md:gap-x-[64px] mt-11 text-slate-50">
            <a href="/">Home</a>
            <a href="/#recommend">Recommended Books</a>
            <a href="/library?sort_by=latest&page=1">Latest Books</a>
            <a href="/#FAQs">FAQs</a>
          </div>
          <div className="flex flex-col">
            <p className="my-3 font-sans text-sm font-normal text-[10px] text-white md:flex md:justify-center text-opacity-70">
              TRY ON MOBILE
            </p>

            <div className="flex w-full gap-2">
              <img src={AppStore} alt="" className="w-6/12 md:w-6/12" />
              <img src={GooglePLay} alt="" className="w-6/12 md:w-6/12" />
            </div>
          </div>
        </div>
        <p className="pt-4 mt-6 text-white border-t border-t-border md:text-[16px] text-[12px] w-full text-center">
          Copyright 2024 dream book .All Rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
