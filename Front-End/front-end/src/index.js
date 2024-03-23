import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App/>
    </ChakraProvider>
  </React.StrictMode>
);


// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import App from "./App";
// import EditPage from "./EditPage";

// const Routes = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={App} />
//         <Route path="/edit/:id" component={EditPage} />
//       </Switch>
//     </Router>
//   );
// };

// export default Routes;
