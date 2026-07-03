import { StyleSheet } from "@react-pdf/renderer";

export const theme = {
  paper: "#FBFAF7",
  ink: "#23201B",
  body: "#3A362F",
  muted: "#6B6459",
  faint: "#8D8779",
  rule: "#E4DFD5"
} as const;

export const styles = StyleSheet.create({
  page: {
    paddingVertical: 48,
    paddingHorizontal: 51,
    backgroundColor: theme.paper,
    color: theme.ink,
    fontFamily: "Geist",
    fontSize: 9.75
  },
  name: {
    fontSize: 22.5,
    fontWeight: 700,
    letterSpacing: -0.3,
    lineHeight: 1.1
  },
  headerTitle: {
    fontSize: 10.5,
    color: theme.muted,
    marginTop: 5
  },
  contactLine: {
    fontSize: 8.6,
    color: theme.faint,
    marginTop: 10.5
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: theme.rule,
    marginTop: 19.5
  },
  body: {
    flexDirection: "row",
    marginTop: 25.5
  },
  mainColumn: {
    flex: 1
  },
  sidebar: {
    width: 164,
    marginLeft: 39
  },
  sectionLabel: {
    textTransform: "uppercase",
    fontSize: 7.5,
    fontWeight: 700,
    letterSpacing: 0.9,
    color: theme.faint,
    marginBottom: 9
  },
  sectionLabelExperience: {
    textTransform: "uppercase",
    fontSize: 7.5,
    fontWeight: 700,
    letterSpacing: 0.9,
    color: theme.faint,
    marginTop: 25.5,
    marginBottom: 10.5
  },
  sidebarSection: {
    marginTop: 24
  },
  profileText: {
    fontSize: 10.1,
    lineHeight: 1.6,
    color: theme.body
  },
  experienceItem: {
    marginBottom: 21
  },
  experienceItemLast: {
    marginBottom: 0
  },
  roleLine: {
    fontSize: 10.1,
    lineHeight: 1.35
  },
  roleName: {
    fontWeight: 700,
    color: theme.ink
  },
  roleCompany: {
    color: theme.muted
  },
  dateLine: {
    fontSize: 8.6,
    color: theme.faint,
    marginTop: 2.25
  },
  summaryText: {
    fontSize: 9.75,
    lineHeight: 1.55,
    color: theme.body,
    marginTop: 5.25
  },
  sidebarItem: {
    fontSize: 9.75,
    color: theme.body,
    marginBottom: 6
  },
  sidebarItemLast: {
    marginBottom: 0
  },
  languageNote: {
    color: theme.faint
  },
  educationTitle: {
    fontSize: 9.75,
    fontWeight: 700,
    lineHeight: 1.5,
    color: theme.ink
  },
  educationMeta: {
    fontSize: 8.6,
    color: theme.faint,
    marginTop: 3
  },
  workModeText: {
    fontSize: 9.75,
    color: theme.body
  }
});
