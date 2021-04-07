import cx from 'classnames'

export default function Button({ ...props }) {
  const disabledClass = 'cursor-default opacity-30'
  return (
    <button
      {...props}
      className={cx(
        props.className,
        'py-3 px-5 bg-primary text-button-color rounded-md w-full',
        { [disabledClass]: Boolean(props.disabled) }
      )}
    />
  )
}
