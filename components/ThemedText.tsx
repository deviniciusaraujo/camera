// O componente ThemedText é uma extensão do componente de texto padrão do React Native,
// adicionando suporte a temas de cores e estilos de topografias predefinidos
import { StyleSheet, Text } from 'react-native';

// O useThemeColor é um hook personalizado que provavelmente determina a cor
// com base no tema do sistema (claro ou escuro)
import { useThemeColor } from '@/hooks/useThemeColor';

// Define o componente ThemeText.
// Ele aceita várias props, incluindo estilo, cores para temas claro/escuro,
// e um "type" para estilos predefinidos

export function ThemedText({
  style, // Estilo extra, que pode sobrescrever os estilos padrão
  lightColor, // Cor para o tema claro
  darkColor, // Cor para o tema escuro
  type = 'default', // Tipo de estilo de texto, com 'default como padrão
  ...rest // Coleta todas as outras props, como 'children' (o texto em si), e as repassa para o componente <Text>
}) { 
  // Usa o hook para obter a cor do texto com base nas cores passadas e no tema atual.
  // Se lightColor e darkColor não forem fornecidos, ela usa a cor padrão 'text
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
    // Combina todos os estilos em um array. A ordem é importante para a
    // sobreposição de estilos
    // 1. A cor diâmica do tema
    // 2. O estilo predefinido (ex: 'title', 'link') baseado na prop  'type'.
    // 3. O estilo extra passado pela prop 'style', que tem maior propriedade.
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      // Repassa as demais props para o component Text ativo
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
