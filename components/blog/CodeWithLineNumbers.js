import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

const exampleCode = `
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trim();

const WithLineNumbers = () => (
    <Highlight {...defaultProps} code={exampleCode} language="jsx">
        {({ className, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className}>
                {tokens.map((line, i) => (
                    <Line key={i} {...getLineProps({ line, key: i })}>
                        <LineNo>{i + 1}</LineNo>
                        <LineContent>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </LineContent>
                    </Line>
                ))}
            </Pre>
        )}
    </Highlight>
);

export default WithLineNumbers;
