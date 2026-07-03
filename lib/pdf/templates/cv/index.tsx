import { Document, Page, Text, View } from "@react-pdf/renderer";

import type { CvPdfData, CvPdfExperience } from "@/lib/pdf/templates/cv/data";
import { styles } from "@/lib/pdf/templates/cv/styles";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text style={styles.sectionHeading}>{title}</Text>
      {children}
    </View>
  );
}

function ExperienceItem({ experience }: { experience: CvPdfExperience }) {
  return (
    <View style={styles.experienceItem}>
      <Text style={styles.experienceRole}>
        {experience.role} — {experience.company}
      </Text>
      <Text style={styles.experiencePeriod}>{experience.period}</Text>
      <Text style={styles.bodyText}>{experience.summary}</Text>
    </View>
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
            <Section title="Profile">
              <Text style={styles.bodyText}>{data.summary}</Text>
            </Section>
            <Section title="Experience">
              {data.experience.map(experience => (
                <ExperienceItem
                  key={`${experience.company}-${experience.period}`}
                  experience={experience}
                />
              ))}
            </Section>
          </View>
          <View style={styles.sidebar}>
            <Section title="Details">
              {data.details.map(detail => (
                <View key={detail.label} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{detail.label}</Text>
                  <Text style={styles.detailValue}>{detail.value}</Text>
                </View>
              ))}
            </Section>
            <Section title="Key skills">
              <Text style={styles.bodyText}>{data.skills.join(", ")}</Text>
            </Section>
            <Section title="Education">
              {data.education.map(education => (
                <View key={education.title}>
                  <Text style={styles.educationTitle}>{education.title}</Text>
                  <Text style={styles.educationMeta}>
                    {education.area} · {education.period}
                  </Text>
                </View>
              ))}
            </Section>
          </View>
        </View>
      </Page>
    </Document>
  );
}
