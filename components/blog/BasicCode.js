import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import Pre from "./Pre";

const Basic = ({ code, language }) => (
    <Highlight {...defaultProps} code={code.trim()} theme={theme} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
            //TODO: Make copy button work
            <pre textInput={code.trim()}>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>
);

export default Basic;