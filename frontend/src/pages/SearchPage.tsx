import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { getSearchResultsAction } from "@/redux/features/myRestaurantSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SearchState } from "@/types/restaurantTypes/restaurantTypes";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const {
    getSearchResultsData,
    getSearchResultsIsLoading,
    getSearchResultsIsError,
    getSearchResultsError,
    getSearchResultsIsSuccess,
  } = useAppSelector((state) => state.myRestaurant);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const getSearchDetails = async () => {
    const token = await getAccessTokenSilently();
    if (city && city.length > 0) {
      const payload = {
        token,
        city,
        searchState,
      };
      dispatch(getSearchResultsAction(payload));
    }
  };

  useEffect(() => {
    getSearchDetails();
  }, [city, searchState]);

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          <div id="cuisines-list">
            {/* <CuisineFilter
                selectedCuisines={searchState.selectedCuisines}
                onChange={setSelectedCuisines}
                isExpanded={isExpanded}
                onExpandedClick={() =>
                  setIsExpanded((prevIsExpanded) => !prevIsExpanded)
                }
              /> */}
          </div>
          <div id="main-content" className="flex flex-col gap-5">
            <SearchBar
              searchQuery={searchState.searchQuery}
              onSubmit={setSearchQuery}
              placeHolder="Search by Cuisine or Restaurant Name"
              onReset={resetSearch}
            />

            {getSearchResultsIsLoading ? (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4 text-orange-500">
                  Loading...
                </h1>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : getSearchResultsIsError ? (
              <div className="text-red-500 font-bold">
                {getSearchResultsError}
              </div>
            ) : (getSearchResultsIsSuccess &&
                getSearchResultsData?.data?.length === 0) ||
              !city ? (
              <div className="text-gray-500 font-bold">No Data Found</div>
            ) : getSearchResultsIsSuccess ? (
              <>
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                  <SearchResultInfo
                    total={getSearchResultsData?.pagination.total as number}
                    city={city}
                  />
                  {/* <SortOptionDropdown
                  sortOption={searchState.sortOption}
                  onChange={(value) => setSortOption(value)}
                /> */}
                </div>

                {getSearchResultsData?.data.map((restaurant) => (
                  <SearchResultCard restaurant={restaurant} />
                ))}

                {/* <PaginationSelector
                page={getSearchResultsData?.pagination.page}
                pages={getSearchResultsData?.pagination.pages}
                onPageChange={setPage}
              /> */}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
