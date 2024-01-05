import { render } from "preact";
import { Suspense, lazy } from "preact/compat";
import { LoadSuspense } from "./LoadSuspense";
import { Helmet } from "react-helmet";
import { uninstallServiceWorkers } from "./util/SWHelper";
import prod from "./config.json";
import { set } from "./util/IDB";

const Routes = lazy(() => import("./routes"));

const firstLoad = localStorage.getItem("firstLoad") || "true";

const theme = localStorage.getItem("theme") || "main";

export default function App() {
  function changeBare(url: string) {
    set("bare", url);
    localStorage.setItem("bare", url);
    uninstallServiceWorkers();
    window.location.reload();
  }

  if (prod) {
    if (firstLoad == "true") {
      async function test() {
        console.log(window.location.origin.replace(/^https?:\/\//, ""));
        // Do Tokyo-US pinging to find optimal server
        const ping = async (url: string) => {
          let start = Date.now();
          await fetch(url);
          let end = Date.now();
          let total = end - start;
          return total;
        };

        const usUrl = "/bare/";
        const jpUrl = "/bare2/";

        const [usTime, jpTime] = await Promise.all([ping(usUrl), ping(jpUrl)]);

        if (usTime < jpTime) {
          console.log("US faster");
          changeBare(usUrl);
        } else {
          console.log("Japan faster");
          changeBare(jpUrl);
        }
        localStorage.setItem("firstLoad", "false");
      }
      test();
    }
  }
  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href={"/themes/" + theme + ".css"}></link>
        <link rel="stylesheet" href="/themes/main.css"></link>
      </Helmet>
      <Suspense fallback={<LoadSuspense />}>
        <div>
          <Routes />
        </div>
      </Suspense>
    </div>
  );
}

render(<App />, document.getElementById("app"));
