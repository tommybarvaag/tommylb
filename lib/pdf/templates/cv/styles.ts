import { StyleSheet } from "@react-pdf/renderer";

export const theme = {
  ink: "#0c0c09",
  muted: "#5b5b4b",
  border: "#e4e4dc",
  paper: "#fbfbf9"
} as const;

export const styles = StyleSheet.create({
  page: {
    paddingVertical: 40,
    paddingHorizontal: 44,
    backgroundColor: theme.paper,
    color: theme.ink,
    fontFamily: "Geist",
    fontSize: 9
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: -0.4,
    lineHeight: 1.2,
    marginBottom: 2
  },
  headerTitle: {
    fontSize: 10,
    color: theme.muted
  },
  contactLine: {
    fontSize: 8,
    color: theme.muted,
    marginTop: 6
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    marginVertical: 14
  },
  body: {
    flexDirection: "row"
  },
  mainColumn: {
    flex: 2,
    paddingRight: 18
  },
  sidebar: {
    flex: 1,
    paddingLeft: 18,
    borderLeftWidth: 1,
    borderLeftColor: theme.border
  },
  sectionHeading: {
    textTransform: "uppercase",
    fontSize: 7.5,
    letterSpacing: 1.2,
    color: theme.muted,
    marginBottom: 6,
    marginTop: 14
  },
  bodyText: {
    fontSize: 9,
    lineHeight: 1.45
  },
  experienceItem: {
    marginBottom: 10
  },
  experienceRole: {
    fontSize: 10,
    fontWeight: 700
  },
  experiencePeriod: {
    fontSize: 8,
    color: theme.muted
  },
  detailRow: {
    marginBottom: 6
  },
  detailLabel: {
    fontSize: 8,
    color: theme.muted
  },
  detailValue: {
    fontSize: 9
  },
  educationTitle: {
    fontSize: 9
  },
  educationMeta: {
    fontSize: 8,
    color: theme.muted
  }
});
