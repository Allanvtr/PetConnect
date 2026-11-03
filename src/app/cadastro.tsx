import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { CheckBox } from '../components/Controls';
import { Footer, Screen, TopBar } from '../components/Layout';
import { T } from '../components/Text';
import { Button, Field, Input, Photo, ProgressBars, lh, textStyles } from '../components/ui';
import { colors } from '../theme/colors';

const FIELDS: { label: string; placeholder: string; hint: string; props: TextInputProps }[] = [
  {
    label: 'Nome completo',
    placeholder: 'Como está no seu documento',
    hint: '',
    props: { autoComplete: 'name', textContentType: 'name', autoCapitalize: 'words' },
  },
  {
    label: 'E-mail',
    placeholder: 'nome@email.com',
    hint: '',
    props: { autoComplete: 'email', textContentType: 'emailAddress', keyboardType: 'email-address', autoCapitalize: 'none' },
  },
  {
    label: 'Telefone / WhatsApp',
    placeholder: '(00) 00000-0000',
    hint: 'Só visível para a ONG depois da confirmação mútua.',
    props: { autoComplete: 'tel', textContentType: 'telephoneNumber', keyboardType: 'phone-pad' },
  },
  {
    label: 'CEP',
    placeholder: '00000-000',
    hint: 'Usado para mostrar os animais mais próximos de você.',
    props: { autoComplete: 'postal-code', textContentType: 'postalCode', keyboardType: 'number-pad' },
  },
];

/** Tela 04 · Criar conta (passo 1 de 2). */
export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  return (
    <Screen keyboard>
      <TopBar title="Criar conta" fallback="/" bordered={false} />

      <View style={{ paddingHorizontal: 16, paddingBottom: 8, gap: 8 }}>
        <ProgressBars filled={1} />
        <T style={{ fontSize: 13, color: colors.muted }}>Passo 1 de 2 · Conta  →  Passo 2 · Perfil de adoção</T>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 8, paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: 6 }}>
          <T style={textStyles.h1}>Crie sua conta</T>
          <T style={{ fontSize: 14, lineHeight: lh(14), color: colors.muted }}>
            Leva cerca de 1 minuto. Depois você preenche o seu perfil de adoção uma única vez, e todas as ONGs
            parceiras o utilizam.
          </T>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Photo style={{ width: 56, height: 56, borderRadius: 28, fontSize: 11 }} />
          <View style={{ gap: 2 }}>
            <T style={{ fontSize: 14, fontWeight: '600', color: colors.navy }}>Adicionar foto (opcional)</T>
            <T style={textStyles.hint}>Toque para escolher uma imagem</T>
          </View>
        </View>

        {FIELDS.map((f) => (
          <Field key={f.label} label={f.label} hint={f.hint || undefined}>
            <Input label={f.label} placeholder={f.placeholder} {...f.props} />
          </Field>
        ))}

        <Field label="Senha">
          <View
            style={{
              height: 48,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 14,
              paddingRight: 4,
              borderWidth: passFocus ? 2 : 1,
              borderColor: passFocus ? colors.navy : colors.lineStrong,
              borderRadius: 10,
            }}
          >
            <TextInput
              accessibilityLabel="Senha"
              placeholder="Mínimo de 8 caracteres"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={!showPassword}
              autoComplete="new-password"
              textContentType="newPassword"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              style={{ flex: 1, minWidth: 0, fontSize: 15, color: colors.ink, fontFamily: 'Inter_400Regular', padding: 0 }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              onPress={() => setShowPassword(!showPassword)}
              style={{ minHeight: 44, paddingHorizontal: 10, justifyContent: 'center' }}
            >
              <T style={{ fontSize: 13, fontWeight: '600', color: colors.navy }}>{showPassword ? 'Ocultar' : 'Mostrar'}</T>
            </Pressable>
          </View>
        </Field>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
          <CheckBox
            checked={agree}
            onChange={() => setAgree(!agree)}
            label="Aceito os termos e a política de privacidade"
            style={{ marginTop: -10, marginLeft: -10 }}
          />
          <T style={{ flex: 1, fontSize: 13, lineHeight: lh(13), color: colors.body }}>
            Li e aceito os termos de uso.{' '}
            <T style={{ fontWeight: '600', color: colors.navy, textDecorationLine: 'underline' }}>
              Como a PetConnect protege seus dados
            </T>
            : seu perfil só é compartilhado com a ONG depois que você confirmar.
          </T>
        </View>
      </ScrollView>

      <Footer style={{ gap: 8 }}>
        <Button label="Criar conta e continuar" href="/formulario" />
        <T style={{ textAlign: 'center', fontSize: 13, color: colors.muted }}>
          Já tem conta? <T style={{ fontWeight: '600', color: colors.navy }}>Entrar</T>
        </T>
      </Footer>
    </Screen>
  );
}
