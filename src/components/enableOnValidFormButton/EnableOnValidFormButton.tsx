import { Button, ButtonProps, Form, FormInstance } from 'antd'
import { useState, useEffect } from 'react'

type EnableOnValidFormButtonProps = ButtonProps & {
  form: FormInstance
}

function EnableOnValidFormButton({
  form,
  ...rest
}: EnableOnValidFormButtonProps) {
  const [submittable, setSubmittable] = useState(false)

  // Watch all values
  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [values])

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} {...rest}>
      Submit
    </Button>
  )
}

export default EnableOnValidFormButton
