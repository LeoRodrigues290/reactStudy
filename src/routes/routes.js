//Importar o componente em Layouts.js

export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      icon: 'chart-pie',
      to: '/',
      exact: true,
      active: true,
    },
    {
      name: 'Projetos',
      icon: 'file',
      to: '/projetos',
      exact: true,
      active: true,
    },
    {
      name: 'Usuários',
      icon: 'users',
      to: '/usuarios',
      exact: true,
      active: true,
    }
    ]
};

export const projectRoutes = {
  label: 'Projeto',
  children: [
    {
      name: 'Forecasting',
      icon: 'envelope-open',
      active: true,
      children: [
        {
          name: 'Planejado',
          to: '/project/planejado',
          active: true
        },
        {
          name: 'Realizado',
          to: '/project/realizado',
          active: true
        },
      ]
    },
    {
      name: 'Cockpit',
      icon: 'list',
      to: '/project/cockpit',
      active: true
    },
  ]
}


export default [
  dashboardRoutes,
  projectRoutes
];
