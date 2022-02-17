import Error from "../Error";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { advanceSearch } from "../../services/explore";
import { resizeImage } from "../../shared/constants";
import useSWRInfinite from "swr/infinite";

interface ExploreResultProps {
  params: string;
  configs: {
    [key: string]: any;
  };
  sectionIndex: number;
}

const ExploreResult: FC<ExploreResultProps> = ({
  params,
  configs,
  sectionIndex,
}) => {
  const getKey = (_, previousPageData: any) => {
    if (previousPageData && previousPageData.length === 0) return null;

    return `explore-${sectionIndex}-${JSON.stringify(configs)}-${
      previousPageData?.slice(-1)?.[0]?.sort || ""
    }`;
  };

  const { data, error, setSize } = useSWRInfinite(
    getKey,
    (key) => advanceSearch(params, configs, key.split("-").slice(-1)[0]),
    {
      revalidateFirstPage: false,
    }
  );

  if (error) return <Error />;

  return (
    <InfiniteScroll
      dataLength={data?.length || 0}
      next={() => setSize((size) => size + 1)}
      hasMore={!error && data?.slice(-1)?.[0]?.length !== 0}
      loader={
        <div className="flex justify-center w-full">
          <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin my-10"></div>
        </div>
      }
      endMessage={<p className="text-center mt-6">Nothing more to see</p>}
    >
      <div className="w-full grid grid-cols-sm md:grid-cols-lg gap-6">
        {data
          ?.reduce((acc, current) => [...acc, ...current], [])
          .map((item) => (
            <Link
              title={item.name}
              to={
                item.domainType === 0 ? `/movie/${item.id}` : `/tv/${item.id}`
              }
              key={item.id}
              className="relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
                <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                  <LazyLoadImage
                    effect="opacity"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={resizeImage(item.coverVerticalUrl, "250")}
                    alt=""
                  />
                </div>

                <div className="flex-grow flex items-center">
                  <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                    {item.name}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default ExploreResult;
