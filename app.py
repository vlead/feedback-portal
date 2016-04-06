import urllib

from flask import Flask, render_template, request, redirect, url_for, json,\
    flash
import requests
import smtplib
import config
from email.mime.text import MIMEText
#from flask_mail import Mail, Message

app = Flask(__name__)
app.config.from_object(config)


@app.route('/', methods=['GET', 'POST'])
def feedback_form():
    if request.method == 'GET':
        fb_ref = request.referrer
        print fb_ref
        if fb_ref:
            response = requests.get(config.DS_URL +
                                    '/labs?hosted_url=' + urllib.quote(fb_ref))
            if len(response.json()) > 0:
                lab = response.json()
                return render_template('feedback.html',
                                       lab_name=lab[0]['name'],
                                       lab_id=lab[0]['id'])

            else:
                response = requests.get(config.DS_URL +
                                        '/experiments?content_url=' +
                                        urllib.quote(fb_ref))
                if len(response.json()) > 0:
                    experiment = response.json()[0]
                    return render_template('feedback.html',
                                           lab_name=experiment['lab']['name'],
                                           lab_id=experiment['lab']['id'],
                                           expt_name=experiment['name'],
                                           expt_id=experiment['id'])
                else:
                    response = requests.get(config.DS_URL +
                                            '/experiments?simulation_url=' +
                                            urllib.quote(fb_ref))
                    if len(response.json()) > 0:
                        experiment = response.json()[0]
                        return render_template('feedback.html',
                                               lab_name=experiment['lab']['name'],
                                               lab_id=experiment['lab']['id'],
                                               expt_name=experiment['name'],
                                               expt_id=experiment['id'])

                    else:
                        # this calls the genric feedback
                        return render_template('feedback.html')

        else:
            # this calls the generic feedback
            return render_template('feedback.html')

    if request.method == 'POST':
        feedback_data = request.form.to_dict()
        if request.form.get('lab'):
            feedback_data['lab'] = {'id': request.form.get('lab')}

        if request.form.get('experiment'):
            feedback_data['experiment'] = {'id':
                                           request.form.get('experiment')}

        feedback_data['ip'] = request.remote_addr
        print json.dumps(feedback_data)
        response = requests.post(config.DS_URL + '/feedback',
                                 data=json.dumps(feedback_data))

        if response.status_code == 200:

            smtpserver = smtplib.SMTP("smtp.gmail.com", 587)
            smtpserver.ehlo()
            smtpserver.starttls()
            smtpserver.login('noreply-feedback@vlabs.ac.in', 'tEpfq]0{jaWh*kv"m6^u')
            
            msg = MIMEText("Name: %s\t  Email: %s\n Q1. How useful do you think Virtual Labs is for an engineering student ?\n A: %s\n Q2. What are your suggestions about making Virtual Labs better ?\n A: %s\n" % (str(feedback_data["user_name"]), str(feedback_data["user_email"]),str(feedback_data["how_useful_are_labs"]), str(feedback_data["suggestions_in_general"])))
            subject = 'Feedback from %s' % str(feedback_data["user_name"])
            msg['Subject'] = subject
            msg['From'] = "madhavipuliraju@gmail.com"
            msg['To'] = "feedback@vlabs.ac.in"

            # Send the message via our own SMTP server, but don't include the
            # envelope header.

            smtpserver.sendmail("madhavipuliraju@gmail.com", "feedback@vlabs.ac.in", msg.as_string())
            smtpserver.quit()

#            print feedback_data["user_name"]
            return redirect(url_for('thanks'))
        else:
            flash('Error posting your feedback')
            return redirect(url_for('feedback_form'))


@app.route('/thanks')
def thanks():
    return render_template('thanks.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
