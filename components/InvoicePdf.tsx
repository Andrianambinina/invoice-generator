import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    color: '#111',
  },
  header: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#555',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  section: {
    marginVertical: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  thead: {
    fontWeight: 'bold',
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tbodyRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  cell: {
    paddingRight: 8,
  },
  colDesignation: { width: '40%' },
  colPU: { width: '20%', textAlign: 'right' },
  colQty: { width: '20%', textAlign: 'right' },
  colTotal: { width: '20%', textAlign: 'right' },

  totalBox: {
    marginTop: 12,
    marginLeft: 'auto',
    width: 240,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  totalRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalLabel: {
    width: '60%',
    fontWeight: 'bold',
  },
  totalValue: {
    width: '40%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  footerNote: {
    marginTop: 16,
    fontSize: 12,
    color: '#444',
  },
});

const internet = Number(process.env.NEXT_PUBLIC_INTERNET) || 70;
const dailyRate = Number(process.env.NEXT_PUBLIC_DAILY_RATE) || 0;
const fullName = process.env.NEXT_PUBLIC_FULL_NAME || 'John Doe';
const stat = process.env.NEXT_PUBLIC_STAT || 'XXXXX XX XXXX X XXXXX';
const nif = process.env.NEXT_PUBLIC_NIF || 'XXXXXXXXX';
const address1 = process.env.NEXT_PUBLIC_ADDRESS_1 || 'Adresse Ligne 1';
const address2 = process.env.NEXT_PUBLIC_ADDRESS_2 || 'Adresse Ligne 2';
const phone = process.env.NEXT_PUBLIC_PHONE || '+261 34 00 000 00';
const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL || 'john.doe@example.com';

type Props = {
  workingDays: number;
};

const InvoicePdf = ({ workingDays }: Props) => {
  const fullMonthName = dayjs().format('MMMM').charAt(0).toUpperCase() + dayjs().format('MMMM').slice(1);
  const month = dayjs().format('MM');
  const year = dayjs().format('YYYY');
  const endOfMonth = dayjs().endOf('month').format('DD');

  const total = dailyRate * workingDays;
  const totalTTC = total + internet;

  const items = [
    {
      designation: `Prestation du mois de ${fullMonthName} ${year}`,
      unitPriceEUR: dailyRate,
      quantity: workingDays,
      totalEUR: total,
    },
    {
      designation: 'Tarif mensuel fibre optique',
      unitPriceEUR: internet,
      quantity: 1,
      totalEUR: internet,
    },
  ];

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>FACTURE</Text>
          <Text>{`Facture mois de ${fullMonthName} ${year}`}</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.col}>
            <View style={styles.section}>
              <Text style={[styles.value, { fontWeight: 'bold' }]}>{fullName}</Text>
              <Text style={styles.label}>Prestataire informatique</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.value}>STAT: {stat}</Text>
              <Text style={styles.value}>NIF: {nif}</Text>
              <Text style={styles.value}>{address1}</Text>
              <Text style={styles.value}>{address2}</Text>
              <Text style={styles.value}>Email: {senderEmail}</Text>
              <Text style={styles.value}>Tel: {phone}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.value}>Référence: {`FACTURE/${month}/${year} - 001`}</Text>
              <Text style={styles.value}>Date: {`${endOfMonth}/${month}/${year}`}</Text>
            </View>
          </View>

          <View style={[styles.col, { flex: 1 / 5, marginTop: 62 }]}>
            <Text style={[styles.value, { fontWeight: 'bold' }]}>SARL LEVEA</Text>
            <Text style={styles.value}>12 rue Vivienne</Text>
            <Text style={styles.value}>75002 Paris - France</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.thead}>
            <Text style={[styles.cell, styles.colDesignation]}>Désignation</Text>
            <Text style={[styles.cell, styles.colPU]}>P.U. (€)</Text>
            <Text style={[styles.cell, styles.colQty]}>Qté</Text>
            <Text style={[styles.cell, styles.colTotal]}>Total (€ TTC)</Text>
          </View>

          {items.map((item, idx) => (
            <View key={idx} style={styles.tbodyRow}>
              <Text style={[styles.cell, styles.colDesignation]}>{item.designation}</Text>
              <Text style={[styles.cell, styles.colPU]}>{item.unitPriceEUR.toFixed(0)}</Text>
              <Text style={[styles.cell, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.cell, styles.colTotal]}>{item.totalEUR.toFixed(0)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TTC à payer</Text>
            <Text style={styles.totalValue}>{totalTTC.toFixed(0)} €</Text>
          </View>
        </View>

        <Text style={styles.footerNote}>En votre aimable règlement, Cordialement.</Text>
      </Page>
    </Document>
  );
};

export default InvoicePdf;
