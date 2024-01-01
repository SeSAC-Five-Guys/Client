import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import UserInfo from '../../components/userInfo';
import ItemIcon from '../../components/itemIcon';

export default function Main() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={4}>
          <UserInfo
            title="회원정보"
            list={[
              {
                name: '현재 닉네임',
                value: 323234,
              },
              {
                name: 'Google',
                value: 341212,
              },
              {
                name: 'Linkedin',
                value: 411213,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <ItemIcon
            title="Kibana"
            icon={<img alt="icon" src="/assets/logos/kibana.png" />}
            link="/"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <ItemIcon
            title="Grafana"
            icon={<img alt="icon" src="/assets/logos/grafana.png" />}
            link="/"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <ItemIcon
            title="Kafka UI"
            icon={<img alt="icon" src="/assets/logos/kafka.webp" />}
            link="/"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <ItemIcon
            title="Argo CD"
            icon={<img alt="icon" src="/assets/logos/argocd.png" />}
            link="/"
          />
        </Grid>
      </Grid>
    </Container>
  );
}