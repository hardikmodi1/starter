import "antd/dist/antd.css";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { client } from "./apollo";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Routes from "./routes";

ReactDOM.render(
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>,
	document.getElementById("root") as HTMLElement
);
registerServiceWorker();
