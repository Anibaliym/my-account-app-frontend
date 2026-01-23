import { Tabs, Tab, Card, CardBody, ScrollShadow, Badge } from '@nextui-org/react';
import { formatDateWithSeparatedHour, formatTodayHour } from '../../../assets/utilities/DateFormater';

export const AccessHistory = ({ userAccessLogGrouped }) => {

    return (
        <div className="row">
            <div className="col">
                <div className="flex w-full flex-col">
                    <Tabs aria-label="Disabled Options" size='sm' disabledKeys={[` ${ (userAccessLogGrouped.today?.length > 0) && 'hoy' } `]}>
                        <Tab key="hoy" title={`Hoy - ${ ( userAccessLogGrouped.today?.length > 0) ? userAccessLogGrouped.today?.length : '' }`}>
                            <Card>
                                <CardBody>
                                    <ScrollShadow hideScrollBar className="h-[200px]" size={100}>
                                        {
                                            userAccessLogGrouped.today?.map( (item, index) => {
                                                const { day, time } = formatDateWithSeparatedHour(item.occurredAt); 
                                                return (
                                                    <div key={ item.id } className={`access-item ${ (index === 0) && 'access-item--active' }`}>
                                                        <span className="access-dot"></span>
                                                        <span className="access-label">{ ` ${ (index === 0) ? 'Ahora' : 'Acceso' } ` }</span>
                                                        <span className="access-time">{ time }</span>
                                                    </div>

                                                )
                                            })
                                        }
                                    </ScrollShadow>

                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="ayer" title={`Ayer - ${ userAccessLogGrouped.yesterday?.length }`}>
                            <Card>
                                <CardBody>
                                    <ScrollShadow className="h-[200px]" size={100}>
                                        {
                                            userAccessLogGrouped.yesterday?.map( (item) => {
                                                const { day, time } = formatDateWithSeparatedHour(item.occurredAt); 

                                                return (
                                                    <div key={ item.id } className="access-item">
                                                        <span className="access-dot"></span>
                                                        <span className="access-label">{ day }</span>
                                                        <span className="access-time">{ time }</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ScrollShadow>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="estaSemana" title={`Esta Semana - ${ userAccessLogGrouped.thisWeek?.length }`}>
                            <Card>
                                <CardBody>
                                    <ScrollShadow hideScrollBar className="h-[200px]" size={50}>
                                        {
                                            userAccessLogGrouped.thisWeek?.map( (item) => {
                                                const { day, time } = formatDateWithSeparatedHour(item.occurredAt); 

                                                return (
                                                    <div key={ item.id } className="access-item">
                                                        <span className="access-dot"></span>
                                                        <span className="access-label">{ day }</span>
                                                        <span className="access-time">{ time }</span>
                                                    </div>
                                                )
                                            })
                                        }                          
                                    </ScrollShadow>
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>  



            </div>        
            <div className="col">
                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options" size='sm'>
                        <Tab key="anterior" title={`Historial de accesos anteriores - ${ userAccessLogGrouped.older?.length }`}>
                        <Card>
                            <CardBody>
                                <ScrollShadow hideScrollBar className="h-[200px]" size={50}>
                                    {
                                        userAccessLogGrouped.older?.map( (item) => {
                                            const { day, time } = formatDateWithSeparatedHour(item.occurredAt); 

                                            return (
                                                <div key={ item.id } className="access-item">
                                                    <span className="access-dot"></span>
                                                    <span className="access-label">{ day }</span>
                                                    <span className="access-time">{ time }</span>
                                                </div>
                                            )
                                        })
                                    }                                
                                </ScrollShadow>
                            </CardBody>
                        </Card>
                        </Tab>
                    </Tabs>
                </div>  
            </div>        
        </div>
    )
}