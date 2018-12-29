import React from 'react';
import DataSearch from "@appbaseio/reactivesearch/lib/components/search/DataSearch";
import ResultList from "@appbaseio/reactivesearch/lib/components/result/ResultList";

const presentQuery = function () {
  return {
    bool: {
      must_not: {
        match: {
          present: false
        }
      }
    }
  };
};

const Search = () => (
  <div>
    <DataSearch
      componentId="searchbox"
      dataField={["text", "ocrText"]}
      debounce={200}
      autosuggest={false}
    />
    <ResultList
      componentId="results"
      dataField="createdAt"
      react={{
        "and": ["searchbox"]
      }}
      onData={(res) => {
        return {
          title: res.createdAt,
          url: `/document/${res._id}`
        }
      }}
      defaultQuery={presentQuery}
      target=""
    />
  </div>
);

export default Search;
