import React from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { hasValue } from '@misc/helpers'

import type { ProjectDetail } from '@graphql/content-types/project/project'
import type { Technologies } from '@graphql/taxonomies/technologies/technology'

import { IconMapper } from '@components/atoms/Icons/Component'
import Link from 'next/link'

interface ArchiveTableProps {
  content: ProjectDetail[]
}

export default function ArchiveTable (props: ArchiveTableProps): JSX.Element {
  const { t } = useTranslation('archive')
  const { content } = props

  return (
    <table className={styles.archiveTable}>
      <thead>
        <tr>
          <th>{t('archiveTable.tableHead.year')}</th>
          <th>{t('archiveTable.tableHead.title')}</th>
          <th className={styles.hideOnMobile}>{t('archiveTable.tableHead.madeAt')}</th>
          <th className={styles.hideOnMobile}>{t('archiveTable.tableHead.builtWith')}</th>
          <th>{t('archiveTable.tableHead.links')}</th>
        </tr>
      </thead>
      <tbody>
        {content.map((item, key) => (
          <tr key={key}>
            <td className={styles.year}>
              <Link href={`/projects/${item.id}`}>
                {item.year}
              </Link>
            </td>

            <td className={styles.title}>
              <Link href={`/projects/${item.id}`}>
                {item.title}
              </Link>
            </td>

            <td className={clsx(styles.company, styles.hideOnMobile)}>
              {item.madeAt}
            </td>
            <td className={clsx(styles.tech, styles.hideOnMobile)}>
              {item.technologies.map((tech: Technologies, key: number) => (
                <span key={key}>
                  {tech.name}
                  <span className={clsx(styles.separator, {
                    [styles.lastChild]: key === item.technologies.length - 1
                  })}
                  >·
                  </span>
                </span>
              ))}
            </td>
            <td className={styles.links}>
              <div className={styles.linkContainer}>
                {hasValue(item.externalLink)
                  ? <a className={styles.link} href={item.externalLink} target='_blank' rel='noreferrer'>{IconMapper('external-link')}</a>
                  : null}
                {hasValue(item.githubLink)
                  ? <a className={styles.link} href={item.githubLink} target='_blank' rel='noreferrer'>{IconMapper('github')}</a>
                  : null}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};
