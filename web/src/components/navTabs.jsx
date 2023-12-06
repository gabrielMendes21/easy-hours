'use client'

import { useState } from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Link from 'next/link'
import Task from './Task'

export default function NavTabs() {
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => setValue(newValue)

  return (
    <Box>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            width: {
              xs: '99%', // 0px => 599px
              sm: '100%', // 600px => 899px
              xl: '100%', // 1536px
            },
          }}
        >
          <TabList
            aria-label="Activities tabs"
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
          >
            <Tab label="Pendentes" value="1" />
            <Tab label="Entregues" value="2" />
            <Tab label="Atrasadas" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Link href="atividades/pre-projeto" className="block mb-5">
            <Task name="Pre-projeto" hours={2} dueDate="19/05/2023" />
          </Link>
          <Task name="Skills Build" hours={30} dueDate="25/06/2023" />
        </TabPanel>
        <TabPanel value="2">
          <Task name="Pitch de apresentação" hours={1} dueDate="19/05/2023" />
          <span className="block my-5"></span>
          <Task name="Cursos DIO" hours={1} dueDate="05/12/2023" />
        </TabPanel>
        <TabPanel value="3">
          <Task name="Webinar" hours={20} dueDate="20/20/2023" />
          <span className="block my-5"></span>
          <Task name="Palestra" hours={0.5} dueDate="16/11/2023" />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
