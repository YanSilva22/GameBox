import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { theme } from '../constants/theme';
import HeaderBack from '../components/HeaderBack';
import Button from '../components/Button';
import { createRepository } from '../database/repositories';
import { createQuestions } from '../database/questions';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function selectFile() {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
        multiple: false,
      });

      if (result.canceled) return;

      const selectedFile = result.assets[0];
      const fileName = selectedFile.name;

      const isCSV = fileName.toLowerCase().endsWith('.csv');
      const isXLSX = fileName.toLowerCase().endsWith('.xlsx');

      if (!isCSV && !isXLSX) {
        setErrorMessage('Selecione somente arquivos CSV ou XLSX.');
        return;
      }

      const pickedFile = new File(selectedFile.uri);

      setFile({
        name: fileName,
        type: selectedFile.mimeType,
        source: pickedFile,
      });

    } catch (error) {
      console.error('File selection error:', error);
      setErrorMessage('Não foi possível selecionar o arquivo.');
    }
  }
  async function readFile() {
    if (!file) {
      setErrorMessage('Selecione um arquivo primeiro.');
      return;
    }

    try {
      setErrorMessage('');
      let rows = [];
      const isCSV = file.name.toLowerCase().endsWith('.csv');

      if (isCSV) {
        const content = await file.source.text();
        const result = Papa.parse(content, {
          skipEmptyLines: 'greedy',
        });

        if (result.errors.length > 0) {
          throw new Error('Erro ao ler o arquivo CSV.');
        }
        rows = result.data;

      } else {
        const content = await file.source.arrayBuffer();
        const workbook = XLSX.read(content, {
          type: 'array',
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
          throw new Error('Nenhuma planilha encontrada.');
        }
        rows = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
        });
      }

      // Remove linhas vazias
      rows = rows.filter(row =>
        Array.isArray(row) &&
        row.some(cell => String(cell).trim() !== '')
      );

      // Remove BOM do cabeçalho
      if (rows.length > 0 && rows[0].length > 0) {
        rows[0][0] = String(rows[0][0])
          .replace(/^\uFEFF/, '')
          .trim();
      }

      // Converte as linhas em perguntas
      const questions = rows.slice(1).map(row => ({
        question: String(row[0] ?? '').trim(),
        option1: String(row[1] ?? '').trim(),
        option2: String(row[2] ?? '').trim(),
        option3: String(row[3] ?? '').trim(),
        option4: String(row[4] ?? '').trim(),
        correct_answer: String(row[5] ?? '').trim().toUpperCase(),
      }));

      if (questions.length === 0) {
        throw new Error('Nenhuma pergunta encontrada.');
      }
      // Valida as perguntas
      const invalidQuestion = questions.some(item =>
        !item.question ||
        !item.option1 ||
        !item.option2 ||
        !item.option3 ||
        !item.option4 ||
        !['A', 'B', 'C', 'D'].includes(item.correct_answer)
      );

      if (invalidQuestion) {
        throw new Error(
          'Existem perguntas incompletas ou respostas inválidas.'
        );
      }

      // Salva no SQLite
      const repositoryId = await createRepository(file.name, null);
      await createQuestions(questions, repositoryId);
      setSuccessMessage(`${questions.length} perguntas importadas com sucesso!`);
    } catch (error) {
      console.error('File reading/saving error:', error);
      setErrorMessage(error.message || 'Não foi possível importar o arquivo.');
      setSuccessMessage('');
    }
  }
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.container}>

          <HeaderBack
            title="Importar perguntas"
            subtitle="Adicione suas próprias perguntas ao Quiz"
            page="HomeScreen"
          />
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
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
          {errorMessage !== '' && (
            <View style={styles.errorContainer}>
              <Feather
                name="alert-circle"
                size={20}
                color="#EF4444"
              />
              <Text style={styles.errorText}>
                {errorMessage}
              </Text>
            </View>
          )}
          {successMessage !== '' && (
            <View style={styles.successContainer}>
              <Feather
                name="check-circle"
                size={20}
                color="#22C55E"
              />

              <Text style={styles.successText}>
                {successMessage}
              </Text>
            </View>
          )}
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
                  {file?.name || 'Arquivo selecionado'}
                </Text>

                <Text style={styles.fileStatus}>
                  Arquivo selecionado
                </Text>
              </View>

              <Pressable onPress={() => { setFile(null); setErrorMessage(''); setSuccessMessage('');}}>
                <Feather
                  name="x"
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
          )}
          {file && (
            <Button
              title="Ler arquivo"
              color={colors.primary}
              onPress={readFile}
            />
          )}
        </ScrollView>
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  errorText: {
    flex: 1,
    color: '#EF4444',
    fontSize: 13,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },

  successText: {
    flex: 1,
    color: '#22C55E',
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
