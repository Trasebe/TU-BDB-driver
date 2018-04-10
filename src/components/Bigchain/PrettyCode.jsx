import React from "react";
import PropTypes from "prop-types";

const PrettyCode = ({ tx }) => (
    <React.Fragment>
      {tx && (
        <div
          style={{
            fontSize: "14px",
            textAlign: "left",
            margin: "auto",
            marginTop: "10%",
            width: "80%"
          }}
        >
          <pre>{JSON.stringify(tx, null, 2)}</pre>
        </div>
      )}
    </React.Fragment>
  );

PrettyCode.propTypes = {
  tx: PropTypes.object.isRequired
};

export default PrettyCode;
