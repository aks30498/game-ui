import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#B91C1C',
            colorBgLayout: '#141414',
          },
          cssVar: true,
          components: {
            Input: {
              colorPrimary: '#FFF',
              algorithm: true,
            },
            DatePicker: {
              colorPrimary: '#FFF',
              algorithm: true,
            },
          },
        }}
      >
        <Layout className='h-screen w-screen'>
          <RouterProvider router={router} />
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
