import React from 'react';
import {ReactiveList, DataSearch} from "@appbaseio/reactivesearch";
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";
import {SpinnerContainer} from './LoadingSpinner';

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
  <>
    <DataSearch
      componentId="searchbox"
      dataField={["text", "ocrText"]}
      debounce={200}
      autosuggest={false}
    />
    <div className="mt-5">
    <ListGroup>
      <ReactiveList
        componentId="results"
        dataField="createdAt"
        react={{
          "and": ["searchbox"]
        }}
        onData={(res) =>
          <Link key={res._id} to={`/document/${res._id}`}>
            <ListGroupItem>{res.text}</ListGroupItem>
          </Link>
        }
        defaultQuery={presentQuery}
        pagination={true}
        sortOptions={[
          { label: 'Created', dataField: 'createdAt', sortBy: 'desc' },
          { label: 'Updated', dataField: 'updatedAt', sortBy: 'desc' }
        ]}
        loader={<SpinnerContainer/>}
        showResultStats={false}
      />
    </ListGroup>
    </div>
  </>
);

export default Search;
