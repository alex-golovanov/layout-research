import { useState, memo } from "react";
import { Button, Flex, Grid, View } from "@adobe/react-spectrum";

const Footer = memo(() => {
  return <View backgroundColor="seafoam-600" gridArea="footer" height="100%" />;
});

function Spectrum() {
  const [count, setCount] = useState(20);

  return (
    <Grid
      areas={{
        base: ["header", "nav", "content", "footer"],
        M: [
          "header   header",
          "nav      content",
          "nav      content",
          "footer   footer",
        ],
        L: [
          "header header  header",
          "nav    content toc",
          "nav    content toc",
          "footer footer  footer",
        ],
      }}
      columns={{
        M: ["size-2000", "1fr"],
        L: [`${count}%`, "1fr"],
      }}
      rows={["size-1000", "1fr", "1fr", "size-1000"]}
      gap="size-100"
      height="100vh"
    >
      {/* <View backgroundColor="celery-600" gridArea="header" height="100%" /> */}
      <div style={{ background: "red", gridArea: "header" }}>test</div>
      <View backgroundColor="blue-600" gridArea="nav" height="100%">
        <Flex
          direction={{ base: "row", M: "column" }}
          gap="size-100"
          margin="size-100"
        >
          <View
            backgroundColor="static-gray-50"
            height="size-250"
            minWidth="size-900"
          />
          <View
            backgroundColor="static-gray-50"
            height="size-250"
            minWidth="size-900"
          />
          <View
            backgroundColor="static-gray-50"
            height="size-250"
            minWidth="size-900"
          />
        </Flex>
        <Button variant="primary" onPress={() => setCount((c) => c + 5)}>
          {count}
        </Button>
      </View>
      <View
        backgroundColor="purple-600"
        gridArea="content"
        height="size-4600"
      />
      <View
        backgroundColor="magenta-600"
        gridArea="toc"
        minHeight="size-1000"
        isHidden={{ base: true, L: true }}
      />
      <Footer />
    </Grid>
  );
}

export default Spectrum;
