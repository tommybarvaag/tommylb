import { Document, Page, Text, View } from "@react-pdf/renderer";

import type { CvPdfData, CvPdfExperience } from "@/lib/pdf/templates/cv/data";
import { styles } from "@/lib/pdf/templates/cv/styles";

function ExperienceItem({ experience, isLast }: { experience: CvPdfExperience; isLast: boolean }) {
  return (
    <View
      style={isLast ? [styles.experienceItem, styles.experienceItemLast] : styles.experienceItem}
    >
      <Text style={styles.roleLine}>
        <Text style={styles.roleName}>{experience.role}</Text>
        <Text style={styles.roleCompany}>{` — ${experience.company}`}</Text>
      </Text>
      <Text style={styles.dateLine}>{experience.period}</Text>
      <Text style={styles.summaryText}>{experience.summary}</Text>
    </View>
  );
}

function SidebarItem({ children, isLast }: { children: React.ReactNode; isLast: boolean }) {
  return (
    <Text style={isLast ? [styles.sidebarItem, styles.sidebarItemLast] : styles.sidebarItem}>
      {children}
    </Text>
  );
}

export function CvPdfTemplate({ data }: { data: CvPdfData }) {
  return (
    <Document title={`${data.name} — CV`} author={data.name}>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.headerTitle}>{data.title}</Text>
          <Text style={styles.contactLine}>{data.contact.join("  ·  ")}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.body}>
          <View style={styles.mainColumn}>
            <Text style={styles.sectionLabel}>Profile</Text>
            <Text style={styles.profileText}>{data.summary}</Text>
            <Text style={styles.sectionLabelExperience}>Experience</Text>
            {data.experience.map((experience, index) => (
              <ExperienceItem
                key={`${experience.company}-${experience.period}`}
                experience={experience}
                isLast={index === data.experience.length - 1}
              />
            ))}
          </View>
          <View style={styles.sidebar}>
            <Text style={styles.sectionLabel}>Key skills</Text>
            {data.skills.map((skill, index) => (
              <SidebarItem key={skill} isLast={index === data.skills.length - 1}>
                {skill}
              </SidebarItem>
            ))}
            <Text style={[styles.sectionLabel, styles.sidebarSection]}>Languages</Text>
            {data.languages.map((language, index) => (
              <SidebarItem key={language.name} isLast={index === data.languages.length - 1}>
                {language.name}
                {language.note ? (
                  <Text style={styles.languageNote}>{` (${language.note})`}</Text>
                ) : null}
              </SidebarItem>
            ))}
            <Text style={[styles.sectionLabel, styles.sidebarSection]}>Education</Text>
            {data.education.map(education => (
              <View key={education.title}>
                <Text style={styles.educationTitle}>{education.title}</Text>
                <Text style={styles.educationMeta}>{education.meta}</Text>
              </View>
            ))}
            <Text style={[styles.sectionLabel, styles.sidebarSection]}>Work mode</Text>
            <Text style={styles.workModeText}>{data.workMode}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
