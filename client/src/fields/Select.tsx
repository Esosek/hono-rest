type ISelectProps = {
  id: string
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  label?: string
}

export const Select = (props: ISelectProps) => {
  return (
    <>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <select name={props.id} id={props.id} value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}>
        {props.options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  )
}
