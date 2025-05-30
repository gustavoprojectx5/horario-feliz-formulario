
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Clock, Wifi, Car, Accessibility, Heart, Baby } from 'lucide-react';

interface DaySchedule {
  day: string;
  shortDay: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface AdditionalServices {
  freeWifi: boolean;
  kidsArea: boolean;
  petFriendly: boolean;
  parking: boolean;
  accessibility: boolean;
}

const BusinessHoursForm = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 'Segunda-feira', shortDay: 'Segunda', openTime: '', closeTime: '', isClosed: false },
    { day: 'Terça-feira', shortDay: 'Terça', openTime: '', closeTime: '', isClosed: false },
    { day: 'Quarta-feira', shortDay: 'Quarta', openTime: '', closeTime: '', isClosed: false },
    { day: 'Quinta-feira', shortDay: 'Quinta', openTime: '', closeTime: '', isClosed: false },
    { day: 'Sexta-feira', shortDay: 'Sexta', openTime: '', closeTime: '', isClosed: false },
    { day: 'Sábado', shortDay: 'Sábado', openTime: '', closeTime: '', isClosed: false },
    { day: 'Domingo', shortDay: 'Domingo', openTime: '', closeTime: '', isClosed: false },
  ]);

  const [services, setServices] = useState<AdditionalServices>({
    freeWifi: false,
    kidsArea: false,
    petFriendly: false,
    parking: false,
    accessibility: false,
  });

  const updateSchedule = (index: number, field: keyof DaySchedule, value: string | boolean) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSchedule(newSchedule);
  };

  const updateService = (service: keyof AdditionalServices, checked: boolean) => {
    setServices(prev => ({ ...prev, [service]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Horários de funcionamento:', schedule);
    console.log('Serviços adicionais:', services);
    // Aqui você pode processar os dados do formulário
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
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {schedule.map((day, index) => (
                <div key={day.day} className="grid grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="space-y-2">
                    <Label htmlFor={`open-${index}`} className="text-sm text-gray-600">
                      {day.shortDay} Abertura
                    </Label>
                    <Input
                      id={`open-${index}`}
                      type="time"
                      value={day.openTime}
                      onChange={(e) => updateSchedule(index, 'openTime', e.target.value)}
                      disabled={day.isClosed}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`close-${index}`} className="text-sm text-gray-600">
                      {day.shortDay} Fechamento
                    </Label>
                    <Input
                      id={`close-${index}`}
                      type="time"
                      value={day.closeTime}
                      onChange={(e) => updateSchedule(index, 'closeTime', e.target.value)}
                      disabled={day.isClosed}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 justify-center">
                    <Checkbox
                      id={`closed-${index}`}
                      checked={day.isClosed}
                      onCheckedChange={(checked) => updateSchedule(index, 'isClosed', checked as boolean)}
                    />
                    <Label
                      htmlFor={`closed-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fechado
                    </Label>
                  </div>
                  
                  <div></div>
                </div>
              ))}
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
