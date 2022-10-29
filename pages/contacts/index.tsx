import { AtIcon } from '@icons/AtIcon';
import { CodeIcon } from '@icons/CodeIcon';
import { HeadsetIcon } from '@icons/HeadsetIcon';
import { ContentLayout } from '@organism/layouts/ContentLayout';

const ContactsPage = () => {
  return (
    <ContentLayout title="Contactos">
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
        
        {/* NUMEROS */}
        <div className="text-center">
          <div className="card shadow-lg h-40">
            <HeadsetIcon tailwindClass='w-14 h-14 self-center text-main-primary mb-2'/>
            <p className="font-bold text-xl">Telefonos</p>
            <p className="text-lg">829-689-8329</p>
            <p className="text-lg">829-420-9077</p>
          </div>
        </div>

        {/* CORREOS */}
        <div className="text-center">
          <div className="card shadow-lg h-40">
            <AtIcon tailwindClass='w-14 h-14 self-center text-main-primary mb-2'/>
            <p className="text-lg font-bold ">Emails</p>
            <p className="text-lg">onepointrd@gmail.com</p>
          </div>
        </div>

        {/* DESARROLLADOR WEB */}
        <div className="text-center">
          <div className="card shadow-lg h-40 ">
            <CodeIcon tailwindClass='w-14 h-14 self-center text-main-primary mb-2' />
            <p className="text-lg">Desarrollador web</p>
            <p className="text-lg">suerojean@gmail.com</p>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export default ContactsPage
