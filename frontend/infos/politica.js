import { View, Text, StyleSheet } from 'react-native';

export default function Politica() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Política de Privacidade</Text>
            <Text style={styles.description}>
                SEÇÃO 1 - INFORMAÇÕES GERAIS
                {'\n'}
                A presente Política de Privacidade contém informações sobre coleta, uso, armazenamento, tratamento e proteção dos dados pessoais dos usuários e visitantes do aplicativo PetAgenda, com a finalidade de demonstrar absoluta transparência quanto ao assunto e esclarecer a todos interessados sobre os tipos de dados que são coletados, os motivos da coleta e a forma como os usuários podem gerenciar ou excluir as suas informações pessoais.
                {'\n'}
                Esta Política de Privacidade aplica-se a todos os usuários e visitantes do aplicativo PetAgenda e integra os Termos e Condições Gerais de Uso do aplicativo PetAgenda doravante nominada Carioca & Amigos.
                {'\n'}
                O presente documento foi elaborado em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/18) e o Marco Civil da Internet (Lei 12.965/14).
                O documento poderá ser atualizado em decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar periodicamente esta seção.
                {'\n\n'}
                SEÇÃO 2 - COMO RECOLHEMOS OS DADOS PESSOAIS DO USUÁRIO?
                {'\n'}
                Os dados pessoais do usuário e visitante são recolhidos pela plataforma da seguinte forma:
                {'\n'}
                Quando o usuário cria uma conta/perfil na plataforma PetAgenda, esses dados são os dados de identificação básicos, como nome completo e e-mail. A partir deles, podemos identificar o usuário, além de garantir uma maior segurança e bem-estar às suas necessidades.
                {'\n'}
                Quando um usuário acessa o aplicativo PetAgenda: as informações sobre interação e acesso são coletadas pela empresa para garantir uma melhor experiência ao usuário. Estes dados podem tratar sobre as palavras-chaves utilizadas em uma busca, o compartilhamento de um documento específico, visualizações de páginas, a URL de onde o usuário provém, dentre outras que poderão ser armazenadas e retidas.
                {'\n\n'}
                SEÇÃO 3 - QUAIS DADOS PESSOAIS RECOLHEMOS SOBRE O USUÁRIO?
                {'\n'}
                Os dados pessoais do usuário e visitante recolhidos são os seguintes:
                Dados para a criação da conta/perfil na plataforma PetAgenda: nome e e-mail.
                {'\n\n'}
                SEÇÃO 4 - POR QUANTO TEMPO OS DADOS PESSOAIS FICAM ARMAZENADOS?
                {'\n'}
                Os dados pessoais do usuário são armazenados pela plataforma durante o período necessário para a prestação do serviço ou o cumprimento das finalidades previstas no presente documento, conforme o disposto no inciso I do artigo 15 da Lei 13.709/18.
                {'\n'}
                Os dados podem ser removidos ou anonimizados a pedido do usuário, excetuando os casos em que a lei oferecer outro tratamento.
                {'\n'}
                Ainda, os dados pessoais dos usuários apenas podem ser conservados após o término de seu tratamento nas seguintes hipóteses previstas no artigo 16 da referida lei:
                {'\n'}
                I - cumprimento de obrigação legal ou regulatória pelo controlador;
                {'\n'}
                II - estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;
                {'\n'}
                III - transferência a terceiro, desde que respeitados os requisitos de tratamento de dados dispostos nesta Lei;
                {'\n'}
                IV - uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que anonimizados os dados.
                {'\n\n'}
                SEÇÃO 5 - SEGURANÇA DOS DADOS PESSOAIS ARMAZENADOS
                {'\n'}
                A plataforma se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.
                {'\n'}
                A plataforma não se exime de responsabilidade por culpa exclusiva de terceiro, como em caso de ataque de hackers ou crackers, ou culpa exclusiva do usuário, como no caso em que ele mesmo transfere seus dados a terceiros. O aplicativo se compromete a comunicar o usuário em caso de alguma violação de segurança dos seus dados pessoais.
                {'\n'}
                Os dados pessoais armazenados são tratados com confidencialidade, dentro dos limites legais. No entanto, podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.
                {'\n\n'}
                SEÇÃO 6 - COMPARTILHAMENTO DOS DADOS
                {'\n'}
                O compartilhamento de dados do usuário ocorre apenas com os dados referentes a publicações realizadas pelo próprio usuário, tais ações são compartilhadas publicamente com os outros usuários.
                {'\n\n'}
                SEÇÃO 7 - CONSENTIMENTO
                {'\n'}
                Ao utilizar os serviços e fornecer as informações pessoais na plataforma, o usuário está consentindo com a presente Política de Privacidade.
                {'\n'}
                O usuário, ao cadastrar-se, manifesta conhecer e pode exercitar seus direitos de cancelar seu cadastro, acessar e atualizar seus dados pessoais e garante a veracidade das informações por ele disponibilizadas.
                {'\n'}
                O usuário tem direito de retirar o seu consentimento a qualquer tempo, para tanto deve entrar em contato através do email petagenda@gmail.com.
                {'\n\n'}
                SEÇÃO 8 - ALTERAÇÕES PARA ESSA POLÍTICA DE PRIVACIDADE
                {'\n'}
                Reservamos o direito de modificar essa Política de Privacidade a qualquer momento, então, é recomendável que o usuário revise-a com frequência.
                Ao utilizar o serviço ou fornecer informações pessoais após eventuais modificações, o usuário e visitante demonstra sua concordância com as novas normas.
                {'\n'}
                Diante da fusão ou venda da plataforma à outra empresa os dados dos usuários podem ser transferidos para os novos proprietários para que a permanência dos serviços oferecidos.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: '8%',
        paddingBottom: 20,
        minHeight: '100%',
    },
    title: {
        color: '#4A1E91',
        fontSize: 20,
        alignSelf: 'center',
        margin: 30,
        fontWeight: 'bold',
    },
    description: {
        color: '#4A1E91',
        fontSize: 16,
        textAlign: 'justify',
        lineHeight: 25,
        paddingVertical: 5,
    },
});