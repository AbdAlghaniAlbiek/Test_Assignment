import { Article } from "@/helpers/stores/articles.store";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  section: { marginBottom: 10 },
});

const ArticleDocument = ({ article }: { article: Article }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          {article.coverImage && (
            <Image
              style={{ width: 80, height: 80, alignSelf: "center" }}
              src={article.coverImage ? article.coverImage.url : ""}
            />
          )}

          <Text style={{ fontSize: 40, textAlign: "center" }}>
            {article.title}
          </Text>
        </View>

        <View style={{ alignSelf: "flex-end" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 12 }}>Tags: </Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
              {article.tags.map((tag) => (
                <Text style={{ fontSize: 12 }}>#{tag.label}, </Text>
              ))}
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 12 }}>Category: </Text>
            <Text style={{ fontSize: 12 }}>{article.category.name}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 20, fontSize: 14 }}>
          {article.content.replace("<p>", "").replace("</p>", "")}
        </Text>
        <Text style={{ marginTop: 20, textAlign: "right", fontSize: 12 }}>
          All Rights Are Reserved
        </Text>
      </View>
    </Page>
  </Document>
);

export default function ArticlePDFDownload({ article }: { article: Article }) {
  return (
    <PDFDownloadLink
      document={<ArticleDocument article={article} />}
      fileName="document.pdf"
      style={{
        textDecoration: "none",
        color: "#fff",
        background: "#007bff",
        padding: "8px 16px",
        borderRadius: 4,
      }}
    >
      {({ loading }) => "Download PDF"}
    </PDFDownloadLink>
  );
}
