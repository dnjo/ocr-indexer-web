import React from 'react';
import {ReactiveList, DataSearch} from "@appbaseio/reactivesearch";
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";

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
    <ListGroup>
      <ReactiveList
        componentId="results"
        dataField="createdAt"
        react={{
          "and": ["searchbox"]
        }}
        onData={(res) => {
          return <Link key={res._id} to={`/document/${res._id}`}><ListGroupItem>{res._id}</ListGroupItem></Link>;
        }}
        defaultQuery={presentQuery}
      />
    </ListGroup>
  </div>
);

export default Search;
