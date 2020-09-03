import styles from '@/styles/System/Taskbar.module.scss';

import type { FC } from 'react';

import { useContext } from 'react';
import { AppsContext } from '@/contexts/Apps';
import { Clock } from '@/components/System/Clock';
import { TaskbarEntry } from '@/components/System/TaskbarEntry';
import { appToFocus, sortByLastRunning } from '@/utils';

export const Taskbar: FC = () => {
  const { apps, updateApp } = useContext(AppsContext),
    runningApps = apps.filter(({ running }) => running).sort(sortByLastRunning);

  return (
    <nav className={styles.taskbar}>
      <ol>
        {runningApps.map(
          ({ id, icon, minimized, name, foreground, stackOrder }, index) => (
            <TaskbarEntry
              key={id}
              foreground={foreground}
              icon={icon}
              name={name}
              onClick={() => {
                if (minimized) {
                  updateApp({ updates: { minimized: false }, id });
                } else {
                  const [foregroundApp] = stackOrder;

                  if (foregroundApp === id) {
                    updateApp({ updates: { minimized: true }, id });
                  } else {
                    appToFocus(apps, updateApp, id);
                  }
                }
              }}
              tabIndex={apps.length + index}
            />
          )
        )}
      </ol>
      <Clock />
    </nav>
  );
};
