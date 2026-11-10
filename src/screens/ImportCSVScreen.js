import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';

import { theme } from '../constants/theme';
import NavigationBar from '../components/NavigationBar';

const { colors, spacing, radius } = theme;

const columns = [
  'Pergunta',
  'Alternativa A',
  'Alternativa B',
  'Alternativa C',
  'Alternativa D',
  'Resposta correta',
];

const example = [
  'O que é React?',
  'Biblioteca',
  'Linguagem',
  'Banco de dados',
  'Sistema',
  'A',
];

export default function ImportCSVScreen() {
  const [file, setFile] = useState(null);

  async function selectFile() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'text/csv',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const selectedFile = result.assets[0];
      const fileName = selectedFile.name.toLowerCase();

      if (!fileName.endsWith('.csv') && !fileName.endsWith('.xlsx')) {
        alert('Selecione somente arquivos CSV ou XLSX.');
        return;
      }

      setFile(selectedFile);
    } catch (error) {
      alert('Não foi possível selecionar o arquivo.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.title}>Importar perguntas</Text>
            <Text style={styles.subtitle}>
              Adicione suas próprias perguntas ao Quiz usando um arquivo CSV ou Excel.
            </Text>
          </View>

          <View style={styles.instructions}>
            <View style={styles.instructionHeader}>
              <Feather name="info" size={20} color={colors.secondary} />
              <Text style={styles.instructionTitle}>
                Como preparar seu arquivo?
              </Text>
            </View>

            <Text style={styles.instructionText}>
              Organize sua planilha com 6 colunas, seguindo este exemplo:
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
            >
              <View>
                <View style={styles.tableRow}>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
                    <View key={letter} style={styles.tableCell}>
                      <Text style={styles.tableLetter}>{letter}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.tableRow}>
                  {columns.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.tableCell, styles.tableHeader]}
                    >
                      <Text style={styles.tableHeaderText}>{item}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.tableRow}>
                  {example.map((item, index) => (
                    <View key={index} style={styles.tableCell}>
                      <Text style={styles.tableText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            <Text style={styles.tip}>
              Cada linha deve representar uma pergunta. Na coluna F, informe a letra da alternativa correta: A, B, C ou D. Salve sua planilha no formato CSV ou XLSX.
            </Text>
          </View>

          <Pressable
            style={styles.uploadArea}
            onPress={selectFile}
          >
            <Feather
              name="upload-cloud"
              size={40}
              color={colors.primary}
            />

            <Text style={styles.uploadTitle}>
              Selecionar arquivo
            </Text>

            <Text style={styles.uploadSubtitle}>
              Toque para procurar um arquivo no dispositivo
            </Text>
          </Pressable>

          {file && (
            <View style={styles.fileCard}>
              <Feather
                name="file-text"
                size={24}
                color={colors.accent}
              />

              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>
                  {file.name}
                </Text>

                <Text style={styles.fileStatus}>
                  Arquivo selecionado
                </Text>
              </View>

              <Pressable onPress={() => setFile(null)}>
                <Feather
                  name="x"
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
          )}
        </ScrollView>

        <NavigationBar active="Configuracoes" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.sm,
  },
  instructions: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  instructionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: 115,
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.sm,
  },
  tableLetter: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableHeader: {
    backgroundColor: colors.surfaceSecondary,
  },
  tableHeaderText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: 'bold',
  },
  tableText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  tip: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  uploadTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    gap: spacing.md,
  },
  fileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  fileName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fileStatus: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
