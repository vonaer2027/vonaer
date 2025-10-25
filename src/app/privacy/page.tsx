'use client'

import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-background text-foreground min-h-screen">
      <VonaerHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      <VonaerMenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              개인정보 처리방침
            </h1>

            <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제1조 (목적)</h2>
                <p className="leading-relaxed">
                  개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 생년월일 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보로만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함)를 말합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  주식회사 모비에이션(이하 "회사"라 합니다.)은 귀하의 개인정보보호를 매우 중요시하며, ⌜개인정보보호법⌟상의 개인정보보호규정을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지를 알려드립니다.
                </p>
                <p className="leading-relaxed mt-4">
                  개인정보 처리방침은 정부의 법령이나 지침의 변경, 또는 보다 나은 서비스의 제공을 위하여 그 내용이 변경될 수 있습니다. 이 경우 회사는 홈페이지에 이를 올리거나 이메일, SNS메시지 등을 통해서 공지하고 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 개인정보 처리방침을 서비스 첫 화면 또는 첫화면과의 연결화면을 통해 공개함으로써 회원가 언제나 용이하게 보실 수 있도록 조치하고 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 개인정보 처리방침의 지속적인 개선을 위하여 개인정보 처리방침을 개정하는데 필요한 절차를 정하고 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제2조 (개인정보 수집에 대한 동의 및 수집 방법)</h2>
                <p className="leading-relaxed">
                  회원은 회사의 동의문 또는 이용약관의 내용에 대해 "동의함" 또는 "동의하지 않음"을 선택할 수 있는 절차를 마련하여 "동의함"을 선택하면 개인정보 수집에 대해 동의한 것으로 봅니다. 단, 회사는 다음 각 호의 어느 하나에 해당하는 경우 동의 없이 회원의 개인정보를 수집﹒이용할 수 있습니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>정보통신서비스의 제공에 관한 계약을 이행하기 위하여 필요한 개인정보로서 경제적﹒기술적인 사유로 통상적인 동의를 받는 것이 뚜렷하게 곤란한 경우</li>
                  <li>정보통신서비스 제공에 따른 요금 정산을 위하여 필요한 경우</li>
                  <li>그 밖에 법률에 특별한 규정이 있는 경우</li>
                  <li>계약을 이행하기 하여 필요한 개인정보로서 경제적﹒기술적인 사유로 통상적인 동의를 받는 것이 뚜렷하게 곤란한 경우</li>
                  <li>수집 목적과 함리적인 관련성이 있고 정보추제에게 불이익이 발생하지 않으며 안전성 확보 조치를 적용한 경우</li>
                </ol>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>당초 수집 목적과 관련성</li>
                  <li>수집 정황 또는 처리 관행에 비춰봤을때 개인정보의 추가적인 이용에 대한 예측 가능성</li>
                  <li>정보주체의 이익 침해 여부</li>
                  <li>가명처리 또는 암호화 등 안전성 확보에 필요한 조치 적용 등의 사항을 모두 고려하여 한단</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  회사가 개인정보를 수집하는 경우에는 반드시 사전에 회원에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>서비스 회원가입 및 서비스 이용 과정에서 회원가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우</li>
                  <li>제휴 서비스 또는 단체 등으로부터 개인정보를 제공받는 경우</li>
                  <li>고객센터를 통한 상담 과정에서 홈페이지, 모바일 어플리케이션, 이메일, 팩스, 전화 등을 통하는 경우</li>
                  <li>온﹒오프라인에서 진행되는 이벤트﹒행사 등을 통한 경우</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제3조 (개인정보 수집﹒이용 목적 및 수집항목 등)</h2>
                <p className="leading-relaxed">
                  회원은 별도의 회원가입 절차 없이 대부분의 컨텐츠에 자유롭게 접근할 수 있습니다. 그러나 회사는 맞춤형 서비스를 제공하기 위하여 회원 서비스 및 제휴사를 통해 회원의 정보를 수집하고 있습니다. 회사의 회원제 서비스를 이용하고자 할 경우 다음의 필수정보를 입력해주셔야 하며 선택항목을 입력하시지 않았다하여 서비스 이용에 제한은 없습니다.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">회원</h3>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left">분류</th>
                        <th className="border border-border px-4 py-2 text-left">수집 . 이용 동의 목적</th>
                        <th className="border border-border px-4 py-2 text-left">항목</th>
                        <th className="border border-border px-4 py-2 text-left">보유﹒이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">필수정보</td>
                        <td className="border border-border px-4 py-2">
                          서비스 가입<br/>
                          계약의 이행 및 서비스 제공<br/>
                          결제 대금의 청구<br/>
                          상담 및 민원처리<br/>
                          고지 및 안내사항 전달<br/>
                          서비스 불법/부정 이용 방지
                        </td>
                        <td className="border border-border px-4 py-2">
                          서비스 가입<br/>
                          이메일, 비밀번호(이메일 회원가입 시 수집), 휴대폰 번호<br/>
                          부가 정보 입력<br/>
                          CI(연계정보)<br/>
                          환불 요청<br/>
                          계좌번호 및 예금주명<br/>
                          고객상담<br/>
                          상담내용 및 상담에 필요한 개인정보
                        </td>
                        <td className="border border-border px-4 py-2">
                          회원 탈퇴 요청 상담 등 민원처리, 정산 및 환불 처리를 위해, 회원 탈퇴 요청 시<br/>
                          관계법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기간까지 보관
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">필수정보</td>
                        <td className="border border-border px-4 py-2">
                          본인확인 및 본인 인증<br/>
                          부정 이용 방지
                        </td>
                        <td className="border border-border px-4 py-2">
                          이름, 생년월일, 성별, 휴대폰번호, CI, 통신사 정보
                        </td>
                        <td className="border border-border px-4 py-2">
                          회원 탈퇴 요청 시<br/>
                          관계법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기간까지 보관
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">필수정보</td>
                        <td className="border border-border px-4 py-2">
                          운항권 발권 및 탑승객 확인<br/>
                          서비스 이용실적 통계 분석<br/>
                          서비스 개선 및 추천<br/>
                          운항 예약
                        </td>
                        <td className="border border-border px-4 py-2">
                          예약자: 이름, 휴대폰번호, 이메일 주소<br/>
                          탑승자: 이름, 성별, 생년월일, 주소, 체중
                        </td>
                        <td className="border border-border px-4 py-2">
                          회원 탈퇴 및 서비스 종료 시까지<br/>
                          관계법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기간까지 보관
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">선택정보</td>
                        <td className="border border-border px-4 py-2">
                          개인맞춤형 상품, 서비스 혜택에 관한 정보 제공<br/>
                          통계, 분석, 이용 내역 정보와의 결합 및 분석<br/>
                          회사 또는 광고주의 요청에 따른 정보 안내(이벤트 및 프로모션 등)전송
                        </td>
                        <td className="border border-border px-4 py-2">
                          디바이스 ID, 휴대폰 번호, 서비스 이용 기록, IP주소, 접속 로그, Cookie, 광고식별자, 단말기 OS 및 버전, 단말기 모델명, 예약자 및 탑승자 정보(이름, 휴대폰 번호, 생년월일, 이메일 주소, 성별), 상담내용 및 상담에 필요한 개인정보
                        </td>
                        <td className="border border-border px-4 py-2">
                          동의 철회, 회원 탈퇴 요청 시
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">법령에 의해 수집﹒이용되는 회원 정보</h3>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left">보유 정보</th>
                        <th className="border border-border px-4 py-2 text-left">보유 기간</th>
                        <th className="border border-border px-4 py-2 text-left">근거 법령</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">계약 또는 청약철회 등에 관한 기록</td>
                        <td className="border border-border px-4 py-2">5년</td>
                        <td className="border border-border px-4 py-2">전자상거래 등에서의 소비자보호에 관한 법률</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">대금결제 및 재화 등의 공급에 관한 기록</td>
                        <td className="border border-border px-4 py-2">5년</td>
                        <td className="border border-border px-4 py-2">전자상거래 등에서의 소비자보호에 관한 법률</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">소비자의 불만 또는 분쟁처리에 관한 기록</td>
                        <td className="border border-border px-4 py-2">3년</td>
                        <td className="border border-border px-4 py-2">전자상거래 등에서의 소비자보호에 관한 법률</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">표시﹒광고에 의한 기록</td>
                        <td className="border border-border px-4 py-2">6개월</td>
                        <td className="border border-border px-4 py-2">전자상거래 등에서의 소비자보호에 관한 법률</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="leading-relaxed mt-4">
                  서비스 사용 과정에서 아래의 정보가 자동으로 생성, 수집될 수 있습니다.
                </p>
                <p className="leading-relaxed mt-2">
                  디바이스 ID, 서비스 이용 기록, 접속 로그, IP주소, 브라우저 버전, 기기 정보(OS정보, 버전, 모델명, 제조사 정보 등)
                </p>

                <p className="leading-relaxed mt-4">
                  회원의 기본적 인권 침해의 우려가 있는 민감한 개인정보는 수집하지 않습니다.
                </p>
                <p className="leading-relaxed mt-2">
                  인종 및 민족, 사상 및 신조, 출생지 및 본적지, 정치적 성향 및 범죄기록, 의료정보 등
                </p>

                <p className="leading-relaxed mt-4">
                  사용자의 개인정보는 서비스를 이용하는 시점부터 서비스를 제공하는 기간 동안에만 제한적으로 이용하고 있습니다. 사용자가 회원 탈퇴를 요청하거나 마지막 로그인 일시를 기준으로 1년이 초과되어 계정 탈퇴 처리가 되는 경우, 제공한 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성되거나 보유 및 이용기간이 종료한 경우, 개인정보는 아래의 방법으로 지체 없이 파기 됩니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>종이에 출력된 개인 정보: 분쇄하거나 소각</li>
                  <li>전자적 파일 형태로 저장된 개인 정보: 기록을 재사용할 수 없는 기술적 방법을 사용하여 삭제</li>
                </ol>

                <p className="leading-relaxed mt-4">
                  사용자의 동의를 받아 보유하고 있는 거래정보에 대하여 열람을 요구하시는 경우 회사는 지체 없이 그 내역을 확인할 수 있도록 조치합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사가 서비스 제공을 위해 수집한 모든 개인정보는 수집 단계부터 안전한 암호화 통신을 이용하여 개인정보 처리방침의 보관기간 동안 저장합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제4조 (개인정보 자동수집 장치의 설치﹒운영 및 그 거부에 관한 사항)</h2>
                <p className="leading-relaxed">
                  쿠키(Cookie)는 회원의 브라우저(크롬, 파이어폭스, 마이크로 소프트 엣지, 기타 모바일 브라우저)로 전송하는 소량의 정보입니다. 회사는 회원에 대한 정보를 저장하고 수시로 찾아내는 '쿠키(Cookie)'를 사용합니다. 쿠키는 회원의 컴퓨터 또는 모바일 기기는 식별하지만 회원을 개인적으로 식별하지는 않습니다.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">회사의 쿠키(Cookie) 운용</h3>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>쿠키(Cookie)에 광고식별자, 디바이스 ID를 적제해 기기별로 차별화된 정보를 제공</li>
                  <li>회원의 접속빈도 또는 머문 시간 등을 분석하여 사용자의 취향과 관심 분야를 파악하여 마케팅에 활용</li>
                  <li>회원들의 습관을 분석하여 서비스 개편 등의 척도로 이용</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제5조 (개인정보 제3자 제공에 대한 동의)</h2>
                <p className="leading-relaxed">
                  회사는 회원의 개인정보를 제3조의 고지한 범위 내에서 사용하며, 동 범위를 초과하여 사용하거나 타인 또는 타기업, 기관에 제공하지 않습니다. 단, 아래와 같이 서비스 제공을 위해 예약 단계에서 개인정보를 제공 받는자, 제공 목적, 제공 항목, 이용 및 보유기간을 회원에게 고지하여 동의를 구한 후 제3자에게 제공합니다.
                </p>

                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left">제공 받는자</th>
                        <th className="border border-border px-4 py-2 text-left">제공 목적</th>
                        <th className="border border-border px-4 py-2 text-left">제공 항목</th>
                        <th className="border border-border px-4 py-2 text-left">보유﹒이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">수도방위사령부</td>
                        <td className="border border-border px-4 py-2">비행계획 제출</td>
                        <td className="border border-border px-4 py-2">이름, 휴대폰번호, 생년월일, 주소</td>
                        <td className="border border-border px-4 py-2">개인정보 이용목적 달성 시까지 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">서울지방항공청</td>
                        <td className="border border-border px-4 py-2">비행계획 제출</td>
                        <td className="border border-border px-4 py-2">이름, 휴대폰번호, 생년월일, 주소</td>
                        <td className="border border-border px-4 py-2">개인정보 이용목적 달성 시까지 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">항공운항사</td>
                        <td className="border border-border px-4 py-2">항공 서비스 제공</td>
                        <td className="border border-border px-4 py-2">이름, 휴대폰번호, 체중</td>
                        <td className="border border-border px-4 py-2">개인정보 이용목적 달성 시까지 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">부가서비스 업체</td>
                        <td className="border border-border px-4 py-2">사전 수하물 운송 서비스 제공<br/>지상 차량 고객 운송 서비스 제공<br/>공항 의전서비스 제공</td>
                        <td className="border border-border px-4 py-2">이름, 휴대폰번호</td>
                        <td className="border border-border px-4 py-2">개인정보 이용목적 달성 시까지 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">본인인증 및 결제 업체</td>
                        <td className="border border-border px-4 py-2">휴대폰 본인인증<br/>상품결제</td>
                        <td className="border border-border px-4 py-2">CI(연계정보)<br/>이름, 카드정보, 휴대폰번호</td>
                        <td className="border border-border px-4 py-2">개인정보 이용목적 달성 시까지 단, 관계법령에 의하여 보존할 필요성이 있는 경우 그 시점까지 보존 후 지체 없이 파기</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="leading-relaxed mt-6">
                  전항에도 불구하고, 다음의 경우에는 예외로 합니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
                  <li>정보주체 또는 그 법정 대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재상의 이익을 위하여 필요하다고 인정되는 경우</li>
                  <li>정보통신서비스의 제공에 따른 요금 정산을 위하여 필요한 경우</li>
                  <li>수집 목적과 합리적인 관련성이 있고 정보주체에게 불이익이 발생하지 않으며 안전성 확보 조치를 적용한 경우</li>
                </ol>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>당초 수집 목적과 관련성</li>
                  <li>수집 정황 또는 처리 관행에 비추어 봤을때 개인정보의 추가적인 이용﹒제공에 대한 예측 가능성</li>
                  <li>정보주체의 이익 침해 여부</li>
                  <li>가명처리 또는 암호화 등 안전성 확보에 필요한 조치 적용 등의 사항을 모두 고려하여 판단</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제6조 (개인정보의 열람 및 정정)</h2>
                <p className="leading-relaxed">
                  사용자는 언제든지 등록되어 있는 본인의 개인정보를 열람하거나 정정할 수 있습니다. 개인정보 열람 및 정정을 하고자 하는 경우 서비스를 통해 직접 열람 또는 정정하거나, 개인정보보호책임자 및 담당자에게 서면, 전화 또는 e-mail로 연락하시면 지체 없이 조치하겠습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  사용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 당해 개인 정보를 이용 또는 제공하지 않습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정하도록 조치하겠습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제7조 (동의 철회)</h2>
                <p className="leading-relaxed">
                  회원가입 등을 통해 개인정보의 수집, 이용, 제공에 대해 회원이 동의한 내용을 회원은 언제든지 철회할 수 있습니다. 동의 철회는 서비스를 통해 '회원탈퇴' 를 진행하거나 개인정보보호책임자에게 우편, 고객센터, 전화 등으로 연락하시면 개인정보의 삭제 등 필요한 조치를 하겠습니다. 동의 철회를 하고 개인정보를 파기하는 등의 조치를 취한 경우에는 그 사실을 사용자에게 지체 없이 통지합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 개인정보의 수집에 대한 동의철회(회원탈퇴)를 개인정보를 수집하는 방법보다 쉽게 할 수 있도록 필요한 조치를 취합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제8조 (개인정보보호를 위한 안전성 확보조치)</h2>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">기술적 대책</h3>
                <p className="leading-relaxed">
                  회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>사용자의 개인정보는 비밀번호에 의해 보호되며 파일 및 전송데이터를 암호화하거나 파일 잠금기능(Lock)를 사용하여 중요한 데이터는 별도의 보안 기능을 통해 보호되고 있습니다.</li>
                  <li>회사는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치를 채택하고 있습니다.</li>
                  <li>해킹 등 외부침입에 대비하여 각 서버마다 침입차단시스템 및 취약점 분석시스템 등을 이용하여 보안에 만전을 기하고 있습니다.</li>
                </ol>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">관리적 대책</h3>
                <p className="leading-relaxed">
                  회사는 귀하의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다. 그 최소한의 인원에 해당하는 자는 다음과 같습니다.
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  <li>사용자를 직접 상대로 하여 마케팅 업무를 수행하는 자</li>
                  <li>고객의 불만 및 사용문의 처리 업무를 수행하는 자</li>
                  <li>개인정보보호책임자 및 담당자 등 개인정보관리업무를 수행하는 자</li>
                  <li>기타 업무상 개인정보의 처리가 불가피한 자</li>
                </ol>

                <p className="leading-relaxed mt-4">
                  입사 시 전 직원의 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보처리방침에 대한 이행사항 및 직원의 준수여부를 감사하기 위한 내부절차를 마련하고 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  개인정보 관련 처리자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후 개인정보 사고에 대한 책임을 명확화하고 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  사내 개인정보보호 전담기구를 통해 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 사용자 개인의 실수나 기본적인 인터넷 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다. 회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의 로그인 체계를 적절하게 관리하고 책임을 져야합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 회사는 즉각 귀하께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">물리적 대책</h3>
                <p className="leading-relaxed">
                  회사는 개인정보가 포함된 보조저장매체의 반출을 원칙적으로 금지하고 있고, 해당 매체의 반출, 반입에 대한 사전 승인을 받도록 하고 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제9조 (링크서비스)</h2>
                <p className="leading-relaxed">
                  회사는 사용자들께 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 이 경우 회사는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의 유용성에 대해 책임과 보증을 질 수 없습니다. 회사가 포함하고 있는 링크를 선택하여 타 서비스의 페이지로 이동하는 경우 해당 서비스의 개인정보처리방침은 회사와 무관하므로 새로 방문한 서비스의 정책을 검토하시기 바랍니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제10조 (개인정보 위탁처리)</h2>
                <p className="leading-relaxed">
                  개인정보의 처리를 위탁하는 경우에는 위탁기관 및 그 사실을 홈페이지를 통해 미리 사용자에게 고지하고 있습니다. 단, 재화 또는 서비스를 홍보하거나 판매를 권유하는 업무를 위탁하는 경우에는 사용자에게 개별적으로 이메일 주소 등을 통해 통지하되, 회사가 과실 없이 서면, 전자우편 등의 방법으로 위탁하는 업무의 내용과 수탁자를 귀하에게 알릴 수 없는 경우에는 해당사항을 서비스에 30일 이상 게시합니다.
                </p>
                <p className="leading-relaxed mt-4">
                  개인정보의 처리를 위탁하는 경우에는 위탁계약 등을 통하여 서비스 제공자의 개인정보보호 관련 지시엄수, 개인정보에 관한 비밀유지, 제3자 제공의 금지 및 사고시의 책임부담, 위탁기간, 처리 종료 후의 개인정보의 반환 또는 파기 등을 명확히 규정하고 당해 계약내용을 서면 또는 전자적으로 보관합니다.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">회사의 개인정보 위탁처리 기관 및 위탁업무</h3>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left">수탁 업체</th>
                        <th className="border border-border px-4 py-2 text-left">위탁 업무 내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">(주)케이지이니시스</td>
                        <td className="border border-border px-4 py-2">신용카드 결제</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">(주)다날</td>
                        <td className="border border-border px-4 py-2">휴대폰 본인인증</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">(주)트립이지</td>
                        <td className="border border-border px-4 py-2">사전 수하물 운송 서비스 제공</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">(주)진모빌리티</td>
                        <td className="border border-border px-4 py-2">지상 차량 고객 운송 서비스 제공</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">(주)올댓아너스클럽</td>
                        <td className="border border-border px-4 py-2">공항 의전서비스 제공</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제11조 (사용자의 권리와 의무)</h2>
                <p className="leading-relaxed">
                  사용자의 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방해주시기 바랍니다. 사용자가 입력한 부정확한 정보로 인해 발생하는 사고와 책임의 사용자 본인에게 있으며 타인 정보의 도용 등 허위정보를 입력하는 경우 회원자격이 상실될 수 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  사용자는 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를 포함한 귀하의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 훼손하지 않도록 유의해 주십시오. 만약, 이 같은 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시 ⌜정보통신망 이용촉진 및 정보보호 등에 관한 법률⌟, ⌜개인정보보호법⌟등에 의해 처벌받을 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제12조 (의견수렴 및 불만처리)</h2>
                <p className="leading-relaxed">
                  회사는 사용자의 의견을 소중하게 생각하며, 의문사항으로부터 언제나 성실한 답변을 받을 권리가 있습니다.
                </p>
                <p className="leading-relaxed mt-4">
                  회사는 사용자와의 원활한 의사소통을 위해 고객센터를 운영하고 있으며 연락처는 다음과 같습니다.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">[고객센터]</h3>
                <p className="leading-relaxed">
                  전자우편: service@vonaer.com<br />
                  고객센터: 1600-9064
                </p>

                <p className="leading-relaxed mt-4">
                  기타 개인정보에 관한 상담이 필요한 경우 회사의 위 전자우편으로 문의할 수 있으며, 국가기관에 신고나 상담이 필요한 경우 아래의 연락처에 문의하여 도움을 받으실 수 있습니다.
                </p>
                <p className="leading-relaxed mt-2">
                  개인정보침해신고센터(http://privacy.kisa.or.kr / 국번 없이 118)<br />
                  대검찰청 사이버수사과(http://spo.go.kr / 국번 없이 1301)<br />
                  경찰청 사이버수사국(http://police.go.kr / 국번 없이 182)
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제13조 (개인정보 보호책임자)</h2>
                <p className="leading-relaxed">
                  회사는 사용자께서 좋은 정보를 안전하게 이용할 수 있도록 최선을 다하고 있습니다. 개인정보를 보호하는데 있어 고지한 사항들에 반하는 사고가 발생할 시 개인정보보호책임자가 모든 책임을 집니다. 그러나 기술적인 보완조치를 했음에도 불구하고, 해킹 등 기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한 정보의 훼손 및 방문자가 작성한 게시물에 의한 각종 분쟁에 관해서는 책임이 없습니다. 귀하의 개인정보를 처리하는 책임자 및 담당자를 안내하며 관련 문의사항에 신속하고 성실하게 답변해드리고 있습니다.
                </p>

                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left">개인정보보호책임자</th>
                        <th className="border border-border px-4 py-2 text-left">개인정보관리담당</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">
                          이름: 박성호<br />
                          직책: CTO<br />
                          소속: 개발팀<br />
                          이메일: ti@moviationair.com<br />
                          전화번호: 02-6012-9500
                        </td>
                        <td className="border border-border px-4 py-2">
                          이름: 박성호<br />
                          직책: CTO<br />
                          소속: 개발팀<br />
                          이메일: ti@moviationair.com<br />
                          전화번호: 02-6012-9500
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">제14조 (개인정보 처리방침의 개정과 그 공지)</h2>
                <p className="leading-relaxed">
                  개인정보 처리방침을 변경하는 경우 회사는 서비스 첫화면의 공지사항 또는 별도의 창을 이용하여 지체 없이 공지하고, 사용자가 언제든지 변경된 사항을 쉽게 알아볼 수 있도록 조치합니다.
                </p>
              </section>

              <section className="mt-12 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  공지일자: 2023년 7월 24일<br />
                  시행일자: 2023년 7월 24일<br />
                  개정일자: 2024년 8월 19일
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <VonaerFooter />
    </div>
  )
}
