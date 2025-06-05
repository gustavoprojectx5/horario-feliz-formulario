
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Clock, Wifi, Car, Accessibility, Heart, Baby, MessageSquare, Truck, CreditCard, Plus, Trash2 } from 'lucide-react';

interface TimeSlot {
  id: string;
  openTime: string;
  closeTime: string;
}

interface DaySchedule {
  day: string;
  shortDay: string;
  timeSlots: TimeSlot[];
  isClosed: boolean;
}

interface AdditionalServices {
  freeWifi: boolean;
  kidsArea: boolean;
  petFriendly: boolean;
  parking: boolean;
  accessibility: boolean;
  delivery: boolean;
  unimedInsurance: boolean;
}

const BusinessHoursForm = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 'Segunda-feira', shortDay: 'Segunda', timeSlots: [{ id: '1', openTime: '', closeTime: '' }], isClosed: false },
    { day: 'Terça-feira', shortDay: 'Terça', timeSlots: [{ id: '1', openTime: '', closeTime: '' }], isClosed: false },
    { day: 'Quarta-feira', shortDay: 'Quarta', timeSlots: [{ id: '1', openTime: '', closeTime: '' }], isClosed: false },
    { day: 'Quinta-feira', shortDay: 'Quinta', timeSlots: [{ id: '1', openTime: '', closeTime: '' }], isClosed: false },
    { day: 'Sexta-feira', shortDay: 'Sexta', timeSlots: [{ id: '1', openTime: '', closeTime: '' }], isClosed: false },
    { day: 'Sábado', shortDay: 'Sábado', timeSlots: [{ id: '1', openTime: '', closeTime: '' }], isClosed: false },
    { day: 'Domingo', shortDay: 'Domingo', timeSlots: [{ id: '1', openTime: '', closeTime: '' }], isClosed: false },
  ]);

  const [holidays, setHolidays] = useState<{ timeSlots: TimeSlot[]; isClosed: boolean }>({
    timeSlots: [{ id: '1', openTime: '', closeTime: '' }],
    isClosed: false,
  });

  const [services, setServices] = useState<AdditionalServices>({
    freeWifi: false,
    kidsArea: false,
    petFriendly: false,
    parking: false,
    accessibility: false,
    delivery: false,
    unimedInsurance: false,
  });

  const [comments, setComments] = useState('');

  const updateTimeSlot = (dayIndex: number, slotId: string, field: 'openTime' | 'closeTime', value: string) => {
    const newSchedule = [...schedule];
    const timeSlotIndex = newSchedule[dayIndex].timeSlots.findIndex(slot => slot.id === slotId);
    if (timeSlotIndex !== -1) {
      newSchedule[dayIndex].timeSlots[timeSlotIndex][field] = value;
      setSchedule(newSchedule);
    }
  };

  const updateDayStatus = (dayIndex: number, isClosed: boolean) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].isClosed = isClosed;
    setSchedule(newSchedule);
  };

  const addTimeSlot = (dayIndex: number) => {
    const newSchedule = [...schedule];
    const newSlotId = Date.now().toString();
    newSchedule[dayIndex].timeSlots.push({ id: newSlotId, openTime: '', closeTime: '' });
    setSchedule(newSchedule);
  };

  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    const newSchedule = [...schedule];
    if (newSchedule[dayIndex].timeSlots.length > 1) {
      newSchedule[dayIndex].timeSlots = newSchedule[dayIndex].timeSlots.filter(slot => slot.id !== slotId);
      setSchedule(newSchedule);
    }
  };

  const updateHolidayTimeSlot = (slotId: string, field: 'openTime' | 'closeTime', value: string) => {
    const timeSlotIndex = holidays.timeSlots.findIndex(slot => slot.id === slotId);
    if (timeSlotIndex !== -1) {
      const newTimeSlots = [...holidays.timeSlots];
      newTimeSlots[timeSlotIndex][field] = value;
      setHolidays(prev => ({ ...prev, timeSlots: newTimeSlots }));
    }
  };

  const addHolidayTimeSlot = () => {
    const newSlotId = Date.now().toString();
    setHolidays(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { id: newSlotId, openTime: '', closeTime: '' }]
    }));
  };

  const removeHolidayTimeSlot = (slotId: string) => {
    if (holidays.timeSlots.length > 1) {
      setHolidays(prev => ({
        ...prev,
        timeSlots: prev.timeSlots.filter(slot => slot.id !== slotId)
      }));
    }
  };

  const updateHolidayStatus = (isClosed: boolean) => {
    setHolidays(prev => ({ ...prev, isClosed }));
  };

  const updateService = (service: keyof AdditionalServices, checked: boolean) => {
    setServices(prev => ({ ...prev, [service]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Horários de funcionamento:', schedule);
    console.log('Feriados:', holidays);
    console.log('Serviços adicionais:', services);
    console.log('Comentários:', comments);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Informações do Estabelecimento</h1>
        <p className="text-gray-600">Configure os horários de funcionamento e serviços oferecidos</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Horários de Funcionamento */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-5 h-5 text-blue-600" />
              Horários de Funcionamento
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              Use o botão "+" para adicionar múltiplos horários no mesmo dia (ex: almoço e jantar)
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {schedule.map((day, dayIndex) => (
                <div key={day.day} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{day.shortDay}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`closed-${dayIndex}`}
                          checked={day.isClosed}
                          onCheckedChange={(checked) => updateDayStatus(dayIndex, checked as boolean)}
                        />
                        <Label htmlFor={`closed-${dayIndex}`} className="text-sm font-medium">
                          Fechado
                        </Label>
                      </div>
                      {!day.isClosed && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTimeSlot(dayIndex)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {!day.isClosed && (
                    <div className="space-y-3">
                      {day.timeSlots.map((slot, slotIndex) => (
                        <div key={slot.id} className="grid grid-cols-5 gap-3 items-center">
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">
                              Abertura {slotIndex + 1}
                            </Label>
                            <Input
                              type="time"
                              value={slot.openTime}
                              onChange={(e) => updateTimeSlot(dayIndex, slot.id, 'openTime', e.target.value)}
                              className="w-full"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <Label className="text-xs text-gray-500">
                              Fechamento {slotIndex + 1}
                            </Label>
                            <Input
                              type="time"
                              value={slot.closeTime}
                              onChange={(e) => updateTimeSlot(dayIndex, slot.id, 'closeTime', e.target.value)}
                              className="w-full"
                            />
                          </div>
                          
                          <div className="flex justify-center">
                            {day.timeSlots.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(dayIndex, slot.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Feriados */}
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-orange-700">Feriados</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="holidays-closed"
                        checked={holidays.isClosed}
                        onCheckedChange={(checked) => updateHolidayStatus(checked as boolean)}
                      />
                      <Label htmlFor="holidays-closed" className="text-sm font-medium text-orange-700">
                        Fechado
                      </Label>
                    </div>
                    {!holidays.isClosed && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addHolidayTimeSlot}
                        className="h-8 w-8 p-0 border-orange-300 text-orange-600 hover:bg-orange-100"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {!holidays.isClosed && (
                  <div className="space-y-3">
                    {holidays.timeSlots.map((slot, slotIndex) => (
                      <div key={slot.id} className="grid grid-cols-5 gap-3 items-center">
                        <div className="space-y-1">
                          <Label className="text-xs text-orange-600">
                            Abertura {slotIndex + 1}
                          </Label>
                          <Input
                            type="time"
                            value={slot.openTime}
                            onChange={(e) => updateHolidayTimeSlot(slot.id, 'openTime', e.target.value)}
                            className="w-full border-orange-300 focus:border-orange-500"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label className="text-xs text-orange-600">
                            Fechamento {slotIndex + 1}
                          </Label>
                          <Input
                            type="time"
                            value={slot.closeTime}
                            onChange={(e) => updateHolidayTimeSlot(slot.id, 'closeTime', e.target.value)}
                            className="w-full border-orange-300 focus:border-orange-500"
                          />
                        </div>
                        
                        <div className="flex justify-center">
                          {holidays.timeSlots.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeHolidayTimeSlot(slot.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Informações Adicionais */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Wifi className="w-5 h-5 text-green-600" />
              Informações Adicionais
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              Marque as opções que se encaixam nas características do seu estabelecimento
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Checkbox
                  id="free-wifi"
                  checked={services.freeWifi}
                  onCheckedChange={(checked) => updateService('freeWifi', checked as boolean)}
                />
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-blue-500" />
                  <Label htmlFor="free-wifi" className="font-medium">
                    Wi-fi gratuito
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Checkbox
                  id="kids-area"
                  checked={services.kidsArea}
                  onCheckedChange={(checked) => updateService('kidsArea', checked as boolean)}
                />
                <div className="flex items-center gap-2">
                  <Baby className="w-4 h-4 text-pink-500" />
                  <Label htmlFor="kids-area" className="font-medium">
                    Área Kids / Brinquedoteca
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Checkbox
                  id="pet-friendly"
                  checked={services.petFriendly}
                  onCheckedChange={(checked) => updateService('petFriendly', checked as boolean)}
                />
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <Label htmlFor="pet-friendly" className="font-medium">
                    Pet Friendly
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Checkbox
                  id="parking"
                  checked={services.parking}
                  onCheckedChange={(checked) => updateService('parking', checked as boolean)}
                />
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-gray-600" />
                  <Label htmlFor="parking" className="font-medium">
                    Estacionamento
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Checkbox
                  id="delivery"
                  checked={services.delivery}
                  onCheckedChange={(checked) => updateService('delivery', checked as boolean)}
                />
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-500" />
                  <Label htmlFor="delivery" className="font-medium">
                    Delivery
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Checkbox
                  id="unimed-insurance"
                  checked={services.unimedInsurance}
                  onCheckedChange={(checked) => updateService('unimedInsurance', checked as boolean)}
                />
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-green-500" />
                  <Label htmlFor="unimed-insurance" className="font-medium">
                    Convênio Unimed
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors md:col-span-2">
                <Checkbox
                  id="accessibility"
                  checked={services.accessibility}
                  onCheckedChange={(checked) => updateService('accessibility', checked as boolean)}
                />
                <div className="flex items-center gap-2">
                  <Accessibility className="w-4 h-4 text-purple-500" />
                  <Label htmlFor="accessibility" className="font-medium">
                    Acessibilidade (elevador / rampa)
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Comentários e Observações */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Comentários e Observações
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-sm text-gray-600">
                Informações adicionais sobre o estabelecimento
              </Label>
              <Textarea
                id="comments"
                placeholder="Ex: Ambiente climatizado, música ao vivo aos finais de semana, etc..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[60px] resize-none"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botão de Envio */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Salvar Informações
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessHoursForm;
