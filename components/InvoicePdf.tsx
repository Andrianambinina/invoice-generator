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

const getWorkingDaysInMonth = (year: string, month: string) => {
  const daysInMonth = dayjs().daysInMonth();
  let workingDays = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = dayjs(`${year}-${month}-${day}`);
    const dayOfWeek = currentDay.day();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
  }
  return workingDays;
};

const InvoicePdf = () => {
  const fullMonthName = dayjs().format('MMMM').charAt(0).toUpperCase() + dayjs().format('MMMM').slice(1);
  const month = dayjs().format('MM');
  const year = dayjs().format('YYYY');
  const endOfMonth = dayjs().endOf('month').format('DD');

  const workingDays = getWorkingDaysInMonth(year, month);
  const fibrePrice = 70;
  const dailyRate = 65;
  const total = dailyRate * workingDays;
  const totalTTC = total + fibrePrice;

  const items = [
    {
      designation: `Prestation du mois de ${fullMonthName} ${year}`,
      unitPriceEUR: dailyRate,
      quantity: workingDays,
      totalEUR: total,
    },
    {
      designation: 'Tarif mensuel fibre optique',
      unitPriceEUR: fibrePrice,
      quantity: 1,
      totalEUR: fibrePrice,
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
              <Text style={[styles.value, { fontWeight: 'bold' }]}>RANAIVO ANDRIANAMBININA Zo Mickaël</Text>
              <Text style={styles.label}>Prestataire informatique</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.value}>STAT: 62022 11 2013 0 10444</Text>
              <Text style={styles.value}>NIF: 5001247889</Text>
              <Text style={styles.value}>Lot II B 95 M Amboditsiry</Text>
              <Text style={styles.value}>101 Antananarivo - Madagascar</Text>
              <Text style={styles.value}>Email: zoandrianambinina@gmail.com</Text>
              <Text style={styles.value}>Tel: + 261 34 04 322 51</Text>
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
