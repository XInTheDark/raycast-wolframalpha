import {
  Action,
  ActionPanel,
  Detail,
  Form,
  useNavigation,
  showToast,
  Toast,
  getPreferenceValues,
  environment,
  Icon,
} from "@raycast/api";
import fetch from "node-fetch";
import { useState } from "react";

export default function Command() {
  const preferences = getPreferenceValues();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { push } = useNavigation();

  const theme = environment.appearance || null;

  const onSubmit = async () => {
    if (!query) {
      await showToast(Toast.Style.Failure, "Please enter something to query");
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        appid: preferences["appID"],
        i: query,
        width: `${474 * 2}`,
        units: "metric",
        fontsize: `${Number(preferences["fontsize"] || 18)}`,
      });
      if (theme) {
        params.append("background", "transparent");
        params.append("foreground", theme === "light" ? "black" : "white");
      }
      const url = `https://api.wolframalpha.com/v1/simple?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 403) {
          await showToast(Toast.Style.Failure, "Invalid App ID", "Update the App ID in the preferences");
          return;
        }
        throw new Error(res.statusText);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      push(
        <Detail
          markdown={
            // `![${query}](https://api.wolframalpha.com/v1/simple?${params.toString()})`
            `![${query}](data:${res.headers.get("content-type")};charset=utf-8;base64,${buffer.toString("base64")})`
          }
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={`https://www.wolframalpha.com/input/?i=${encodeURIComponent(query)}`} />
            </ActionPanel>
          }
        />,
      );
    } catch (err) {
      await showToast(Toast.Style.Failure, "Could not query WolframAlpha", (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={onSubmit} title="Query" icon={Icon.MagnifyingGlass} />
          <Action.OpenInBrowser url={`https://www.wolframalpha.com/input/?i=${encodeURIComponent(query)}`} />
        </ActionPanel>
      }
      isLoading={loading}
    >
      <Form.TextArea title="Query Wolfram Alpha..." id="query" onChange={(query) => setQuery(query)} storeValue />
    </Form>
  );
}
