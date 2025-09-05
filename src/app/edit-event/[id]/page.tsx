import CreateEvent from '~/features/create-event';

type Props = {
    params: Promise<{ id: string }>
}
const EditEventPage = async ({ params }: Props) => {
    const { id } = await params;
    return (
        <CreateEvent id={id} />
    )
}

export default EditEventPage